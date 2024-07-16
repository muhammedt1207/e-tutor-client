import React, { useEffect, useState } from 'react';
import { URL } from '../../Common/api';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSocket } from '../../contexts/SocketContext';
import { FaImage, FaVideo, FaAudioDescription } from 'react-icons/fa';

const ChatersList = ({ onUserSelect }) => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector((state) => state.user);
  const { socket } = useSocket();
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

          const lastMessage = chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : null;

          return {
            name: participant.userName,
            chatId: chat._id,
            time: new Date(lastMessage ? lastMessage.createdAt : chat.createdAt),
            seen: chat.messages.length,
            lastMessage: lastMessage
              ? {
                content: lastMessage.content,
                contentType: lastMessage.contentType,
              }
              : { content: 'No messages yet', contentType: 'text' },
            profileImageUrl: participant.profileImageUrl,
            receiverId: participant._id,
            senderId: user._id,
            lastSeen: participantLastSeen ? new Date(participantLastSeen.seenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Never'
          };
        });

        // Sort chats based on the last message time
        fetchedChats.sort((a, b) => b.time - a.time);

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
      socket.on('newMessage', ({ obj }) => {
        setChats(prevChats => {
          const updatedChats = prevChats.map(chat =>
            chat.chatId === obj.chatId
              ? {
                ...chat,
                lastMessage: { content: obj.content, contentType: obj.contentType },
                time: new Date(obj.time),
                seen: true
              }
              : chat
          );
          updatedChats.sort((a, b) => b.time - a.time);
          return updatedChats;
        });
      });
    }

    return () => {
      if (isConnected && typeof socket.off === 'function') {
        socket.off('newMessage');
      }
    };
  }, [socket, isConnected]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLastMessage = (lastMessage) => {
    if (lastMessage.contentType === 'text') {
      return lastMessage.content;
    } else if (lastMessage.contentType === 'image') {
      return <div className='flex items-center'><FaImage /> Image</div>;
    } else if (lastMessage.contentType === 'video') {
      return <div className='flex items-center'><FaVideo /> Video</div>;
    } else if (lastMessage.contentType === 'audio') {
      return <div className='flex items-center'><FaAudioDescription /> Audio</div>;
    } else {
      return 'Unknown message type';
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-full">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {filteredChats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center p-5 bg-white shadow-sm mb-2 rounded-lg cursor-pointer"
            onClick={() => onUserSelect(chat)}
          >
            <img
              src={chat.profileImageUrl || 'https://i.sstatic.net/l60Hf.png'}
              alt={chat.name}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
              <div className="font-bold">{chat.name}</div>
              <div className="text-sm text-gray-600 truncate w-12">{renderLastMessage(chat.lastMessage)}</div>
              {/* <div className="text-xs text-gray-500 ">{chat.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</div> */}
            </div>
            <div className=''>
              {onlineUsers.includes(chat.receiverId) ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-gray-500">
                  {chat.lastSeen == 'Never' ? 'Never' : chat.lastSeen}
                </span>
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
