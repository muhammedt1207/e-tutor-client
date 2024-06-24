import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contexts/SocketContext';

const ChatHeader = ({ user }) => {
  const socket = useSocket();
  const [typingStatus, setTypingStatus] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  useEffect(() => {
    if (socket && user) {
      const handleTyping = ({ sender, roomId }) => {
        console.log('Typing event received', sender, user.chat.receiverId, roomId, user.chat.chatId);
        if (sender === user.chat.receiverId && roomId === user.chat.chatId) {
          console.log('Setting typing status to true');
          setTypingStatus(true);
        }
      };

      const handleStopTyping = ({ sender, roomId }) => {
        console.log('Stop typing event received', sender, user.chat.receiverId, roomId, user.chat.chatId);
        if (sender === user.chat.receiverId && roomId === user.chat.chatId) {
          console.log('Setting typing status to false');
          setTypingStatus(false);
        }
      };

      const handleUserOnline = (onlineUsers) => {
        console.log(onlineUsers,user.chat,'online users ');
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
      console.log('gitting online users🕘🕙');
      socket.on('userLastSeen', handleLastSeen);

      return () => {
        socket.off('typing', handleTyping);
        socket.off('stopTyping', handleStopTyping);
        socket.off('getOnlineUsers', handleUserOnline);
        socket.off('userLastSeen', handleLastSeen);
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
        {/* Optional buttons for additional actions */}
        {/* <button className="btn btn-circle btn-outline"><i className="fa fa-search"></i></button>
        <button className="btn btn-circle btn-outline"><i className="fa fa-ellipsis-h"></i></button> */}
      </div>
    </div>
  );
};

export default ChatHeader;
