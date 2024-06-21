import React from 'react';
import { useSelector } from 'react-redux';

const ChatBubble = ({ messages }) => {
  const {user}=useSelector(select=>select.user)

  console.log(messages,user._id,'');
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages && messages.map((message) => (
        <div key={message.id} className={`chat ${message.senderId === user._id ? 'chat-end' : 'chat-start'} mb-4`}>
          <div className={`chat-bubble ${message.senderId === user._id  ? 'bg-black text-white' : 'bg-gray-700 text-white'}`}>
            <div className="font-bold">{message.sender}</div>
            <div>{message.content}</div>
            <div className="text-xs text-gray-300 flex justify-between mt-2">
              {/* <span>{message.seen} seen</span> */}
              <span>{message.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBubble;
