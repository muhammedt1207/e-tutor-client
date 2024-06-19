import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as Yup from 'yup';

const offerSchema = Yup.object().shape({
  offer: Yup.number()
    .min(0, 'Offer must be between 0 and 99')
    .max(99, 'Offer must be between 0 and 99')
    .required('Offer is required'),
});

const OfferModal = ({ setOffer, setDateRange, handleCloseModal, handleSubmitOffer, currentCourse }) => {
  const [dateRange, setDateRangeState] = useState([
    {
      startDate: currentCourse.offerDetails && currentCourse.offerDetails.startDate
        ? new Date(currentCourse.offerDetails.startDate)
        : new Date(),
      endDate: currentCourse.offerDetails && currentCourse.offerDetails.endDate
        ? new Date(currentCourse.offerDetails.endDate)
        : new Date(),
      key: 'selection',
    },
  ]);

  const [offerInput, setOfferInput] = useState(
    currentCourse.offerDetails ? currentCourse.offerDetails.offer : 0
  );
  const [offerError, setOfferError] = useState('');

  useEffect(() => {
    setDateRange(dateRange);
  }, [dateRange, setDateRange]);

  useEffect(() => {
    if (currentCourse.offerDetails && currentCourse.offerDetails.startDate && currentCourse.offerDetails.endDate) {
      setDateRangeState([
        {
          startDate: new Date(currentCourse.offerDetails.startDate),
          endDate: new Date(currentCourse.offerDetails.endDate),
          key: 'selection',
        },
      ]);
    }
  }, [currentCourse]);

  const handleOfferInputChange = (e) => {
    const offerValue = e.target.value;
    setOfferInput(offerValue);

    offerSchema
      .validate({ offer: offerValue }, { abortEarly: false })
      .then(() => {
        setOfferError('');
        setOffer(offerValue);
      })
      .catch((err) => {
        setOfferError(err.errors[0]);
      });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md w-1/3">
          <h2 className="text-xl font-bold mb-4">Set Offer for {currentCourse.title}</h2>
          <input
            type="number"
            value={offerInput}
            onChange={handleOfferInputChange}
            placeholder="Enter offer details"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          {offerError && <p className="text-red-500 mb-4">{offerError}</p>}
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRangeState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="mb-4"
          />
          <div className="flex justify-end gap-2">
            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
              Cancel
            </button>
            <button onClick={handleSubmitOffer} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferModal;