import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../Common/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';
import { PaperAirplaneIcon, PaperClipIcon, XCircleIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { PiPaperPlaneRight } from 'react-icons/pi';
import ImageUpload from '../../util/ImageUpload';
import { ReactMic } from 'react-mic';
import EmojiPicker from 'emoji-picker-react';
import { BiHappyHeartEyes } from 'react-icons/bi';
import VideoUpload from '../../util/VideoUploed';

const MessageInput = ({ chatId, recieversId, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.user);
  const socket = useSocket();
  const [typing, setTyping] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [recording, setRecording] = useState(false);

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
      socket.emit('typing', { roomId: chatId, sender: user._id });
    }
  };

  const handleFileUpload = async (event) => {
    try {
      event.stopPropagation();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.jpg, .jpeg, .png, .mp4, .avi, .mov';
      input.click();

      input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) {
          toast.error('No file selected');
          return;
        }

        // Check file size (15MB limit)
        if (file.size > 15 * 1024 * 1024) {
          toast.error('File size exceeds 15MB limit');
          return;
        }

        setFileUploading(true);

        // Determine file type
        let type;
        if (file.type.startsWith('image/')) {
          type = 'image';
        } else if (file.type.startsWith('video/')) {
          type = 'video';
        } else {
          toast.error('Please upload a valid image or video file');
          setFileUploading(false);
          return;
        }

        try {
          let url;
          if (type === 'image') {
            url = await ImageUpload(file);
          } else if (type === 'video') {
            url = await VideoUpload(file);
          } else {
            toast.error('Image and Video only support');
          }
          setFileUrl(url);
          setMessage(url);
          setFileType(type);
          toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file. Please try again.');
        } finally {
          setFileUploading(false);
        }
      });
    } catch (error) {
      console.error('Error in file upload:', error);
      toast.error('An error occurred during file upload');
      setFileUploading(false);
    }
  };

  const handleSendMessage = async () => {
    console.log(message,'message');
    if (!message.trim() && !fileUrl) {
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
        contentType: fileType || 'text',
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
        contentType: fileType,
      };

      const res = await axios.post(`${URL}/chat/message`, {
        messageData,
        chatData: chatId,
      });

      const newMessage = {
        id: res.data.data._id,
        sender: user.userName,
        senderId: user._id,
        content: res.data.data.content,
        time: new Date(res.data.data.createdAt).toLocaleTimeString(),
        seen: 0,
        contentType: fileType,
      };
      onMessageSent(newMessage);
      setMessage('');
      setFileUrl(null);
      setFileType(null);
      socket.emit('stopTyping', { roomId: chatId, sender: user._id });
      setTyping(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  const handleRemoveFile = () => {
    setFileUrl(null);
    setFileType(null);
    setMessage('');
  };

  const handleEmojiClick = (event) => {
    const emoji = event.emoji;
    setSelectedEmoji(emoji);
    setMessage(prevMessage => prevMessage + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onStop = async (recordedBlob) => {
    setFileUploading(true);
    console.log(recordedBlob,'audio recording,,,,,,,');
    try {
      const audioUrl = await VideoUpload(recordedBlob.blob);
      setFileUrl(audioUrl);
      setFileType('audio');
      setMessage(audioUrl);
      console.log(audioUrl,'audio url recorded');
      toast.success('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio. Please try again.');
    } finally {
      setFileUploading(false);
    }
  };

  return (
    <div className="p-2 bg-white shadow-inner">
      {fileUrl && (
        <div className="mb-2 relative">
          {fileType === 'image' ? (
            <img src={fileUrl} alt="Attached image" className="max-h-40 rounded" />
          ) : fileType === 'video' ? (
            <video src={fileUrl} controls className="max-h-40 rounded">
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio src={fileUrl} controls className="w-full">
              Your browser does not support the audio element.
            </audio>
          )}
          <XCircleIcon
            className="w-6 h-6 absolute top-1 right-1 cursor-pointer text-red-500"
            onClick={handleRemoveFile}
          />
        </div>
      )}
      <div className="flex items-center relative">
        <PaperClipIcon className="w-8 ms-2 cursor-pointer absolute text-gray-400" onClick={handleFileUpload} />
        <BiHappyHeartEyes className="text-3xl cursor-pointer absolute ms-10 text-gray-400" onClick={toggleEmojiPicker} />
        {fileUploading && <span className="">Uploading...</span>}
        <input
          type="text"
          placeholder="Your message"
          className="input input-bordered flex-1 pl-20 pr-24"
          value={message}
          onChange={handleInputChange}
        />
        <button
          className="btn m-2 bg-orange-400 text-white"
          onClick={handleSendMessage}
          disabled={fileUploading}
        >
          <PiPaperPlaneRight />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-full -0 mb-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <div className="absolute right-24 flex items-center">
          {recording ? (
            <XMarkIcon
              className="w-8 h-8 text-red-500 cursor-pointer"
              onClick={stopRecording}
            />
          ) : (
            <MicrophoneIcon
              className="w-8 h-8 text-gray-400 cursor-pointer"
              onClick={startRecording}
            />
          )}
        </div>
      </div>
      <ReactMic
        record={recording}
        className="hidden"
        onStop={onStop}
        mimeType="audio/webm"
      />
    </div>
  );
};

export default MessageInput;
