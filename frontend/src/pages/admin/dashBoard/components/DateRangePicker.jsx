import React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangepicker = ({ isVisible, onClose, dateRange, setDateRange, onApply }) => {
  if (!isVisible) return null;

  const handleApply = () => {
    onApply();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Select Date Range</h2>
        <DateRangePicker
          ranges={dateRange}
          onChange={item => setDateRange([item.selection])}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangepicker;
