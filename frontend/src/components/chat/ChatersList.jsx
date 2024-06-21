import React, { useEffect, useState } from 'react';
import { URL } from '../../Common/api';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatersList = ({ onUserSelect }) => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchChattersList = async () => {
    if (user) {
      try {
        const res = await axios.get(`${URL}/chat/chats/${user._id}`);
        console.log(res, 'response data from chated users >>>>>>>>>>>>>>>>');

        const fetchedChats = res.data.data.map((chat) => {
          const participant = chat.participants.find(
            (p) => p._id !== user._id
          )  
          console.log(chat.participants,'participants........');
          return {
            name: participant.userName,
            chatId:chat._id,
            time: new Date(chat.createdAt).toLocaleTimeString(),
            seen: chat.messages.length,
            lastMessage:
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].content
                : 'No messages yet',
            profileImageUrl: participant.profileImageUrl,
          };
        });

        setChats(fetchedChats);
      } catch (error) {
        console.error('Error fetching chatters list:', error);
        toast.error("Can't fetch chatters list. Please try again later.");
      }
    } else {
      toast.error("Can't get logged user. Please re-login.");
    }
  };

  useEffect(() => {
    fetchChattersList();
  }, []);

  return (
    <div className="w-2/6 bg-gray-100 p-4">
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
            </div>
            <div className="text-xs text-gray-500">{chat.time}</div>
            {chat.seen > 0 && (
              <div className="ml-2 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {chat.seen}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatersList;
