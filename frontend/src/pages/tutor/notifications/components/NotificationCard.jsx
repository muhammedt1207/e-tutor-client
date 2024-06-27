import React from 'react'

const NotificationCard = ({notification}) => {
  return (
    <div>
       <div key={notification.id} className="flex items-start p-4 mb-4 bg-white rounded shadow">
          <div className="mr-4 text-2xl text-gray-500">
            {notification.icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{notification.user}</span>
              <span className="text-sm text-gray-400">{notification.time}</span>
            </div>
            <p className="text-gray-700">{notification.action}</p>
            <p className="text-gray-600">{notification.details}</p>
            {notification.comment && (
              <p className="text-gray-500 mt-2 italic">{notification.comment}</p>
            )}
          </div>
        </div>
    </div>
  )
}

export default NotificationCard
