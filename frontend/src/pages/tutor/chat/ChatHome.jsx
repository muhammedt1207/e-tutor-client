import React, { useState, useEffect } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import ChatersList from '../../../components/chat/ChatersList';
import ChatHeader from '../../../components/chat/ChatHeader';
import ChatBubble from '../../../components/chat/ChatBubble';
import MessageInput from '../../../components/chat/MessageInput';
import { URL } from '../../../Common/api';
import SideBar from '../components/SideBar';

const ChatHome = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleUserSelect = async (chat) => {
    setSelectedChat({ chat });
    await fetchMessages(chat.chatId);
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`${URL}/chat/${chatId}`);
      console.log(res.data.data,'<><><<<<><><><>><<><>><><><>>>>>>><><><><><><><><');
      const fetchedMessages = res.data.data.messages.map((message) => ({
        id: message._id,
        sender: message.sender.userName,
        senderId:message.sender._id,
        content: message.content,
        time: new Date(message.createdAt).toLocaleTimeString(),
        seen: message.receiverSeen ? 1 : 0,
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error("Can't fetch messages. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen">
        <SideBar/>
        <div className='sm:rounded-lg flex lg:ml-44 ml-52 w-[85vw] p-5 border shadow-md h-full pe-4 ps-16'>

      
      <ChatersList onUserSelect={handleUserSelect} />
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader user={selectedChat} />
            <ChatBubble selectedChat={selectedChat} setMessages={setMessages} messages={messages} />
            <MessageInput chatId={selectedChat.chat.chatId} recieversId={selectedChat.chat.receiverId} onMessageSent={handleNewMessage} />
          </>
        ) : (
          <h1>Select a chat to start messaging</h1>
        )}
      </div>
      </div>
    </div>
  );
};

export default ChatHome;
