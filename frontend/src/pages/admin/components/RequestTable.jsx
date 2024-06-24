import React, { useState } from 'react';
import Modal from './Modal';
import {  useNavigate } from 'react-router-dom';

const RequestTable = ({ customer, index }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onViewDetails = () => {
    navigate(`/admin/instructor-view/${customer.email}`);
  };

  return (
    <>
      <tr className='hover:bg-gray-200 active:bg-gray-300 cursor-pointer space-x-3 pt-6'>
        <td className="gap-4 ml-5 px-7">
          <div className="overflow-clip flex justify-center items-center shrink-0">
            <p className="line-clamp-1">{index}</p>
          </div>
        </td>
        <td className="capitalize shrink-0">
          <div className="overflow-clip flex justify-center items-center shrink-0 w-64">
            <p className="line-clamp-2">{customer.email}</p>
          </div>
        </td>
        <td className="admin-table-row flex justify-center capitalize shrink-0">
          <div className="line-clamp-2">Designer</div>
        </td>
        <td className="admin-table-row px-44">
          <div className="flex items-center justify-center gap-2 text-lg">
            <button
              className="text-green-500  w-20 rounded-lg"
              onClick={toggleModal}
            >
              Action
            </button>
            <button
              className="text-blue-500  w-20 rounded-lg"
              onClick={onViewDetails}
            >
              View 
            </button>
          </div>
        </td>
      </tr>
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          data={customer.email}
        />
      )}
    </>
  );
};

export default RequestTable;
