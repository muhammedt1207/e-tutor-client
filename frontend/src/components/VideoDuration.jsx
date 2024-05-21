import React, { useState, useRef, useEffect } from 'react';

const VideoDuration = ({ src }) => {
  const [duration, setDuration] = useState(null);
  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <video ref={videoRef} src={src} style={{ display: 'none' }} />
      {duration !== null ? (
        <p>Duration: {formatDuration(duration)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoDuration;
