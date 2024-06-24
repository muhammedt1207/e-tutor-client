import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../Common/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';

const MessageInput = ({ chatId, recieversId, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.user);
  const socket = useSocket();
  const [typing, setTyping] = useState(false);

  console.log(socket, 'socket get in message................................................................', recieversId, chatId);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typing) {
        socket.emit('stopTyping', { roomId: chatId, sender: user._id });
        setTyping(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [message, typing, chatId, socket, user._id]);

  const handleInputChange = (e) => {
   setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      console.log('typing...');
      socket.emit('typing', { roomId: chatId, sender: user._id });
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    try {
      const data = {
        sender: user.userName,
        reciever: recieversId,
        content: message,
        senderId: user._id,
        chatId: chatId,
        time: new Date().toLocaleTimeString(),
        seen: 0,
      };

      if (socket) {
        socket.emit('newMessage', { obj: data });
      } else {
        console.error('Socket not connected yet, cannot emit message.');
      }

      const messageData = {
        sender: user._id,
        reciever: recieversId,
        content: message,
      };

      const res = await axios.post(`${URL}/chat/message`, {
        messageData,
        chatData: chatId,
      });

      setMessage('');
      const newMessage = {
        id: res.data.data._id,
        sender: user.userName,
        senderId: user._id,
        content: res.data.data.content,
        time: new Date(res.data.data.createdAt).toLocaleTimeString(),
        seen: 0,
      };
      onMessageSent(newMessage);
      socket.emit('stopTyping', { roomId: chatId, sender: user._id });
      setTyping(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-inner flex items-center">
      <input
        type="text"
        placeholder="Your message"
        className="input input-bordered flex-1 mr-4"
        value={message}
        onChange={handleInputChange}
      />
      <button className="btn bg-orange-400 text-white" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
