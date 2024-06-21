import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../../Common/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const MessageInput = ({ chatId, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.user);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    try {
      const messageData = {
        sender: user._id,
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
        content: res.data.data.content,
        time: new Date(res.data.data.createdAt).toLocaleTimeString(),
        seen: 0,
      };
      onMessageSent(newMessage);
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
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn bg-orange-400 text-white" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
