import React, { useState, useEffect } from 'react';
import { FaRegCommentDots, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useSocket } from '../../../contexts/SocketContext';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { URL } from '../../../Common/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const {user} = useSelector(state => state.user);
    const { socket } = useSocket()
    useEffect(() => {
        fetchNotifications();
        if(socket){
            socket.on('connect', () => {
                console.log('Connected to notification socket');
                socket.emit('join', user._id);
            });
    
            socket.on('newNotification', (notification) => {
                setNotifications(prev => [notification, ...prev]);
            });
    
            return () => {
                socket.disconnect();
            };
        }
    }, [user._id]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${URL}/chat/notification/${user._id}`);
            const data = response.data.data
            console.log(data);
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'comment':
                return <FaRegCommentDots />;
            default:
                return <FaUserCircle />;
        }
    };

    return (
        <div className='flex '>
            <SideBar />
            <div className=" shadow-md sm:rounded-lg   flex flex-col  w-full lg:ml-44 ml-52 px-16 pe-10">
                <div className="p-4">
                    {notifications && notifications.map((notification) => (
                        <div key={notification._id} className="flex items-start p-4 mb-4 bg-white rounded shadow">
                            <div className="mr-4 text-2xl text-gray-500">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">E-tutor</span>
                                    <span className="text-sm text-gray-400">{new Date(notification.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="text-gray-700">{notification.action}</p>
                                <p className="text-gray-600">{notification.details}</p>
                                {notification.content && (
                                    <p className="text-gray-500 mt-2 italic">{notification.content}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notifications;