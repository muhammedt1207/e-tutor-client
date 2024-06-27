import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import VideoCall from './VideoCall';
import toast from 'react-hot-toast';

const ChatHeader = ({ user }) => {
  const { socket } = useSocket();
  const [typingStatus, setTypingStatus] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    if (socket && user) {
      const handleTyping = ({ sender, roomId }) => {
        if (sender === user.chat.receiverId && roomId === user.chat.chatId) {
          setTypingStatus(true);
        }
      };

      const handleStopTyping = ({ sender, roomId }) => {
        if (sender === user.chat.receiverId && roomId === user.chat.chatId) {
          setTypingStatus(false);
        }
      };

      const handleUserOnline = (onlineUsers) => {
        setOnlineStatus(onlineUsers.includes(user.chat.receiverId));
      };

      const handleLastSeen = ({ userId, lastSeenTime }) => {
        if (userId === user.chat.receiverId) {
          setLastSeen(lastSeenTime);
        }
      };

      socket.on('typing', handleTyping);
      socket.on('stopTyping', handleStopTyping);
      socket.on('getOnlineUsers', handleUserOnline);
      socket.on('userLastSeen', handleLastSeen);

      socket.on('incomingCall', (data) => {
        setIncomingCall(data);
        toast((t) => (
          <span>
            Incoming call 
            <button className='bg-green-600 rounded-sm p-1' onClick={() => acceptCall(data, t)}>Accept</button>
            <button className='bg-red-600 p-1 ms-1 rounded-md' onClick={() => declineCall(data, t)}>Decline</button>
          </span>
        ), { duration: 10000 });
      });

      socket.on('callAccepted', (data) => {
        setIsInCall(true);
      });

      socket.on('callDeclined', () => {
        toast.error('Call was declined');
      });

      socket.on('callEnded', () => {
        toast.info('The call has ended');
        setIsInCall(false);
      });

      return () => {
        socket.off('typing', handleTyping);
        socket.off('stopTyping', handleStopTyping);
        socket.off('getOnlineUsers', handleUserOnline);
        socket.off('userLastSeen', handleLastSeen);
        socket.off('incomingCall');
        socket.off('callAccepted');
        socket.off('callDeclined');
        socket.off('callEnded');
      };
    }
  }, [socket, user]);

  const renderStatus = () => {
    if (typingStatus) {
      return 'Typing...';
    } else if (onlineStatus) {
      return 'Online';
    } else if (lastSeen) {
      return `Last seen at ${new Date(lastSeen).toLocaleTimeString()}`;
    } else {
      return 'Offline';
    }
  };

  const startCall = () => {
    socket.emit('offer', { 
      roomId: user.chat.chatId, 
      senderId: user._id, 
      receiverId: user.chat.receiverId 
    });
    setIsInCall(true);
  };

  const acceptCall = (data, toastId) => {
    toast.dismiss(toastId);
    socket.emit('callAccepted', { roomId: data.roomId, to: data.from });
    setIsInCall(true);
  };

  const declineCall = (data, toastId) => {
    toast.dismiss(toastId);
    socket.emit('callDeclined', { roomId: data.roomId, to: data.from });
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  if (isInCall) {
    return <VideoCall user={user} onEndCall={handleEndCall} />;
  }

  return (
    <div className="bg-white p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={user.chat.profileImageUrl}
          alt={user.chat.name}
          className="w-10 h-10 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{user.chat.name}</h2>
          <div className="text-sm text-gray-600">{renderStatus()}</div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="btn btn-circle btn-outline" onClick={startCall}>
          <BsFillCameraVideoFill />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;