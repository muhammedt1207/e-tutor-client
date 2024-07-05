import React, { useEffect, useState } from 'react';
import { URL } from '../../Common/api';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSocket } from '../../contexts/SocketContext';

const ChatersList = ({ onUserSelect }) => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.user);
  const {socket}  = useSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const fetchChattersList = async () => {
    if (user) {
      try {
        const res = await axios.get(`${URL}/chat/chats/${user._id}`);
        console.log(res, 'response data from chated users >>>>>>>>>>>>>>>>');

        const fetchedChats = res.data.data.map((chat) => {
          const participant = chat.participants.find(
            (p) => p._id !== user._id
          );
          console.log(chat.participants, 'participants........');
          const participantLastSeen = chat.lastSeen.find(
            (ls) => ls.participant.toString() === participant._id
          );
  
          return {
            name: participant.userName,
            chatId: chat._id,
            time: new Date(chat.createdAt).toLocaleTimeString(),
            seen: chat.messages.length,
            lastMessage:
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].content
                : 'No messages yet',
            profileImageUrl: participant.profileImageUrl,
            receiverId: participant._id,
            senderId:user._id,
            lastSeen: participantLastSeen ? new Date(participantLastSeen.seenAt).toLocaleTimeString() : 'Never'
          };
        });

        setChats(fetchedChats);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chatters list:', error);
        toast.error("Can't fetch chatters list. Please try again later.");
        setIsLoading(false);
      }
    } else {
      toast.error("Can't get logged user. Please re-login.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Socket changed:', socket);
    
    if (socket && typeof socket.connected === 'boolean') {
      setIsConnected(socket.connected);
      socket.on('connect', () => setIsConnected(true));
      socket.on('disconnect', () => setIsConnected(false));
      socket.on('getOnlineUsers', (users) => setOnlineUsers(users));
    }

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('getOnlineUsers');
      }
    };
  }, [socket]);

  useEffect(() => {
    fetchChattersList();

    if (isConnected && typeof socket.on === 'function') {
      socket.on('new message', ({ chatId, message }) => {
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.chatId === chatId
              ? { ...chat, lastMessage: message.content, time: message.time, seen: chat.seen + 1 }
              : chat
          )
        );
      });
    }

    return () => {
      if (isConnected && typeof socket.off === 'function') {
        socket.off('new message');
      }
    };
  }, [socket, isConnected]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-100 p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center p-5 bg-white shadow-sm mb-2 rounded-lg cursor-pointer"
            onClick={() => onUserSelect(chat)}
          >
            <img
              src={chat.profileImageUrl}
              alt={chat.name}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
              <div className="font-bold">{chat.name}</div>
              <div className="text-sm text-gray-600">{chat.lastMessage}</div>
              <div className="text-xs text-gray-500">{chat.time}</div>
            </div>
            <div> 
              {onlineUsers.includes(chat.receiverId) ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-gray-500">Last seen {chat.lastSeen}</span>
              )}
            </div>
            {/* {chat.seen > 0 && (
              <div className="ml-2 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {chat.seen}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatersList;
