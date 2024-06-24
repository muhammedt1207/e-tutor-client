import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';

const ChatBubble = ({ messages, setMessages, selectedChat }) => {
  const { user } = useSelector(state => state.user);
  const socket = useSocket();
  const [isSocketReady, setIsSocketReady] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (socket) {
      setIsSocketReady(true);
    } else {
      console.warn('Socket is not ready or does not have expected methods');
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketReady) {
      const handleNewMessage = (message) => {
        console.log(message,message.obj.chatId,selectedChat.chat.chatId);
        if (message.obj.chatId === selectedChat.chat.chatId) {
          setMessages(prevMessages => [...prevMessages, message.obj]);
          scrollToBottom();
        }
      };

      socket.on('newMessage', handleNewMessage);
      console.log('message is here');
      return () => {
        socket.off('newMessage', handleNewMessage);
      };
    }
  }, [isSocketReady, selectedChat, setMessages, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReadReceipt = (messageId) => {
    // Logic to update the read receipt in the backend
  };

  useEffect(() => {
    messages.forEach(message => {
      if (!message.seen && message.senderId !== user._id) {
        handleReadReceipt(message.id);
      }
    });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      {messages && messages.map((message) => (
        <div key={message.id} className={`chat ${message.senderId === user._id ? 'chat-end' : 'chat-start'} mb-4`}>
          <div className={`chat-bubble ${message.senderId === user._id ? 'bg-black text-white' : 'bg-gray-700 text-white'}`}>
            <div className="font-bold">{message.sender}</div>
            <div>{message.content}</div>
            <div className="text-xs text-gray-300 flex justify-between mt-2">
              <span>{message.time}</span>
              <span>{message.seen ? '✔️✔️' : '✔️'}</span> 
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBubble;
