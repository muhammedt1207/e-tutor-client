import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

const SocketContext = createContext({
  socket: null,
  onlineUsers: []
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingCallMessage, setIncomingCallMessage] = useState(null);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user && user._id) {
      const newSocket = io("https://gizmocart.shop", {
        // const newSocket = io("http://localhost:8087", {
        query: { userId: user._id },
        withCredentials: true,
      });

      newSocket.on("connect", () => {
        console.log("Connected to server");
        setSocket(newSocket);
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
        setSocket(null);
      });

      newSocket.on("getOnlineUsers", (users) => {
        console.log("Online users:", users);
        setOnlineUsers(users);
      });

      newSocket.on('incomingCall', (data) => {
        console.log('Incoming call:', data);
        toast((t) => (
          <div className="bg-green-100 p-4 rounded-md">
            <p className="font-medium">Incoming call</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  window.location.href = data.data.link;
                  toast.dismiss(t.id);
                }}
              >
                Join
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => toast.dismiss(t.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ), {
          duration: 20000, // 10 seconds
          position: 'top-right',
        });
      });
    

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  const value = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
