import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Hide after 10 seconds
    }
  }, [message]);

  return (
    <div className={`notification ${isVisible ? 'show' : 'hide'}`}>
      {isVisible && (
        <div className="notification-content">
          {message}
        </div>
      )}
    </div>
  );
};

export default Notification;
