import React, { useState, useEffect } from 'react';
import ChatersList from '../../../components/chat/ChatersList';
import ChatBubble from '../../../components/chat/ChatBubble';
import MessageInput from '../../../components/chat/MessageInput';
import ChatHeader from '../../../components/chat/ChatHeader';
import axios from 'axios';
import toast from 'react-hot-toast';
import { URL } from '../../../Common/api';

const TeacherComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const[recieverId,setRecieverId]=useState(null)

  const handleUserSelect = async (chat) => {
    setSelectedChat({ chat });
    setRecieverId(chat.recieverId)
    console.log(recieverId);
    await fetchMessages(chat.chatId);
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`${URL}/chat/${chatId}`);
      const fetchedMessages = res.data.data.messages.map((message) => ({
        id: message._id,
        sender: message?.sender.userName,
        senderId:message?.sender._id,
        content: message?.content,
        contentType:message?.contentType,
        time: new Date(message?.createdAt).toLocaleTimeString(),
        seen:message?.recieverSeen||true,
      }
    ));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error("Can't fetch messages. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className='w-2/6'>

      <ChatersList onUserSelect={handleUserSelect}  />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader user={selectedChat} />
            <ChatBubble selectedChat={selectedChat} setMessages={setMessages} messages={messages} />
            <MessageInput chatId={selectedChat.chat.chatId} recieversId={selectedChat.chat.receiverId} onMessageSent={handleNewMessage} />
          </>
        ) : (
          <h1 className='flex justify-center items-center text-lg font-medium'>Select a chat to start messaging !</h1>
        )}
      </div>
    </div>
  );
};

export default TeacherComponent;
