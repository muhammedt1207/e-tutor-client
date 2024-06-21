import React from 'react';

const ChatHeader = ({user}) => {
  console.log(user,'\\||||||||||');
  return (
    <div className="bg-white p-4 shadow-sm flex items-center">
      <div className="flex">
      <img
              src={user.chat.profileImageUrl}
              alt={user.chat.name}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
        <h2 className="text-xl font-bold">{user.chat.name}</h2>
        <div className="text-sm text-gray-600"></div>
      </div>
      <div className="flex space-x-2">
        {/* <button className="btn btn-circle btn-outline"><i className="fa fa-search"></i></button>
        <button className="btn btn-circle btn-outline"><i className="fa fa-ellipsis-h"></i></button> */}
      </div>
    </div>
  );
};

export default ChatHeader;
