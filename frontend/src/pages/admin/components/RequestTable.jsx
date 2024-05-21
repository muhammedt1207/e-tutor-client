import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { acceptRequest } from '../../../redux/action/AdminActions';
import Modal from './Modal';

const RequestTable = ({ customer, index }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    
    

    const handleModalClose = () => {
        setShowModal(false);
    };
    const toggleBlockOrUnBlockModal=()=>{
        setShowModal(!showModal)
    }

    return (
        <>
            <tr className='hover:bg-gray-200 active:bg-gray-300 cursor-pointer space-x-3 pt-6'>
                <td className=" gap-4 ml-5 px-7">
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
                            className="hover:text-gray-500 bg-green-500  w-20 rounded-lg"
                            onClick={(e) => {
                                setShowModal(true);
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </td>
            </tr>
            {showModal && (
                <Modal toggleBlockOrUnBlockModal={toggleBlockOrUnBlockModal}
                data={customer.email}
                />
            )}
        </>
    );
};

export default RequestTable;
