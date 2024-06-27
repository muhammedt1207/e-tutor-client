import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const VideoCall = ({ user, onEndCall }) => {
    console.log(user,'user data in videpo component');
  const { socket } = useSocket();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [debugLog, setDebugLog] = useState([]);
    // const {user}=useSelector(state=>state.user)
  const addDebugLog = (message) => {
    console.log(message);
    setDebugLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.ontrack = (event) => {
      addDebugLog(`Received remote track: ${event.track.kind}`);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDebugLog('Sending ICE candidate');
        socket.emit('ice-candidate', { receiverId: user.chat.receiverId, candidate: event.candidate });
      }
    };

    pc.oniceconnectionstatechange = () => {
      addDebugLog(`ICE connection state changed: ${pc.iceConnectionState}`);
    };

    pc.onsignalingstatechange = () => {
      addDebugLog(`Signaling state changed: ${pc.signalingState}`);
    };

    return pc;
  };

  useEffect(() => {
    let localStream;

    const initCall = async () => {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = localStream;
    
            peerConnectionRef.current = new RTCPeerConnection({
              iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });
    
            localStream.getTracks().forEach((track) => {
              peerConnectionRef.current.addTrack(track, localStream);
            });
    
            peerConnectionRef.current.ontrack = (event) => {
              addDebugLog(`Received remote track: ${event.track.kind}`);
              remoteVideoRef.current.srcObject = event.streams[0];
            };
    
            peerConnectionRef.current.onicecandidate = (event) => {
              if (event.candidate) {
                addDebugLog('Sending ICE candidate');
                socket.emit('ice-candidate', { roomId: user.chat.chatId, candidate: event.candidate });
              }
            };
    
            console.log(user, user.chat.receiverId, 'user id');
            if (user._id !== user.chat.receiverId) {
              addDebugLog('Creating offer');
              const offer = await peerConnectionRef.current.createOffer();
              await peerConnectionRef.current.setLocalDescription(offer);
              console.log('offer :', offer);
              addDebugLog(
                `Sending offer: ${JSON.stringify({
                  roomId: user.chat.chatId,
                  receiverId: user.chat.receiverId,
                  senderId: user._id,
                })}`
              );
              socket.emit('offer', {
                roomId: user.chat.chatId,
                receiverId: user.chat.receiverId,
                senderId: user.chat.senderId,
                offer: {
                  type: offer.type,
                  sdp: offer.sdp,
                },
              });
            }
    
            setupSocketListeners();
          } catch (error) {
            addDebugLog(`Error initializing call: ${error.message}`);
            toast.error('Failed to initialize call');
          }
        };

    initCall();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const setupSocketListeners = () => {
    socket.on('ice-candidate', async (data) => {
      try {
        addDebugLog('Received ICE candidate');
        if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      } catch (error) {
        addDebugLog(`Error adding ICE candidate: ${error.message}`);
      }
    });

    socket.on('offer', async (data) => {
      try {
        console.log(data,'===============================');
        addDebugLog(`Received offer: ${JSON.stringify(data.offer)}`);
        if (!data.offer || !data.offer.type) {
          throw new Error('Invalid offer received');
        }
        console.log('connecting peer ',peerConnectionRef.current && peerConnectionRef.current.signalingState !== 'closed',peerConnectionRef.current,'----' ,peerConnectionRef.current.signalingState)
        if (peerConnectionRef.current && peerConnectionRef.current.signalingState !== 'closed') {
            console.log('connection peer ture');
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
          console.log('build remote peer connection33333333333333');
          const answer = await peerConnectionRef.current.createAnswer();
          console.log(answer,'444444444444444444444444444444');
          await peerConnectionRef.current.setLocalDescription(answer);
          console.log('readu for the answer emit555555555555555');
          socket.emit('answer', { 
            receiverId: data.senderId,
            answer: { 
              type: answer.type, 
              sdp: answer.sdp 
            } 
          });
        } else {
          addDebugLog('PeerConnection is not in a state to receive offer');
        }
      } catch (error) {
        addDebugLog(`Error handling offer: ${error.message}`);
      }
    });

    socket.on('answer', async (data) => {
      try {
        
        addDebugLog(`Received answer: ${JSON.stringify(data.answer)}`);
        if (!data.answer || !data.answer.type) {
          throw new Error('Invalid answer received');
        }
        console.log('connecting peer in answer',peerConnectionRef.current && peerConnectionRef.current.signalingState !== 'closed',peerConnectionRef.current,'----' ,peerConnectionRef.current.signalingState)

        if (peerConnectionRef.current && peerConnectionRef.current.signalingState == 'answer') {
            console.log('inside of the if casxe');
          await peerConnectionRef.current.setRemoteDescription(data.answer);
        } else {
          addDebugLog('PeerConnection is not in a state to receive answer');
        }
      } catch (error) {
        addDebugLog(`Error handling answer: ${error.message}`);
      }
    });

    socket.on('callEnded', () => {
      addDebugLog('Call ended');
      toast.info('The call has ended');
      onEndCall();
    });
  };

  const endCall = () => {
    addDebugLog('Ending call');
    socket.emit('endCall', { receiverId: user.chat.receiverId });
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    onEndCall();
  };

  const toggleCamera = () => {
    const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOn(!isCameraOn);
    addDebugLog(`Camera turned ${videoTrack.enabled ? 'on' : 'off'}`);
  };

  return (
    <div className="video-call-container">
      <video ref={localVideoRef} autoPlay muted playsInline className="local-video" />
      <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
      <div className="controls">
        <button className='p-3 bg-gray-300' onClick={toggleCamera}>
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
        <button onClick={endCall} className="end-call-btn bg-red-500 p-3 rounded-xl">End Call</button>
      </div>
      
    </div>
  );
};

export default VideoCall;