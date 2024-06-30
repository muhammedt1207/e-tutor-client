import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({ user }) => {
  const { socket } = useSocket();
  const navigate=useNavigate()
  const [typingStatus, setTypingStatus] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const [isCalling, setIsCalling] = useState(false); // State to track video call status

  useEffect(() => {
    if (socket && user) {
      const handleTyping = ({ sender, roomId }) => {
        if (sender === user.chat.receiverId) {
          setTypingStatus(true);
        }
      };

      const handleStopTyping = ({ sender, roomId }) => {
        if (sender === user.chat.receiverId) {
          setTypingStatus(false);
        }
      };

      const handleUserOnline = (onlineUsers) => {
        console.log(onlineUsers,'this online users...');
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


    

    

      return () => {
        socket.off('typing', handleTyping);
        socket.off('stopTyping', handleStopTyping);
        socket.off('getOnlineUsers', handleUserOnline);
        socket.off('userLastSeen', handleLastSeen);
      };
    }
  }, [socket, user]);

  const startCall = () => {
    navigate(`/call?id=${user.chat.receiverId}&senderId=${user.chat.receiverId}`)
  };

  

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
        {!isCalling ? (
          <button className="btn btn-circle btn-outline" onClick={startCall}>
            <BsFillCameraVideoFill />
          </button>
        ) : (
          <span className="text-gray-600">Calling...</span>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
