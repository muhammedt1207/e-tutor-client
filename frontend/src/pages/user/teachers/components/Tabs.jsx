import React, { useState } from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex border-b w-1/2">
            {['Courses',  'Member Ship'].map(tab => (
                <button
                    key={tab}
                    className={`py-2 px-4 focus:outline-none ${activeTab === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
