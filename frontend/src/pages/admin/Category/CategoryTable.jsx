import React, { useState } from 'react'
import Modal from '../components/Modal';

const CategoryTable = () => {
    const [showModal,setShowModal]=useState(false)
    return (
        <>
            <tr className='hover:bg-gray-200 active:bg-gray-300 cursor-pointer space-x-3 pt-6'>
                <td className=" gap-4 ml-5 px-7">
                    <div className="overflow-clip flex justify-center items-center shrink-0">
                        <p className="line-clamp-1">11u</p>
                    </div>
                </td>
                <td className="capitalize shrink-0">
                    <div className="overflow-clip flex justify-center items-center shrink-0 w-64">
                        <p className="line-clamp-2">mofasdiasdf</p>
                    </div>
                </td>
                <td className="admin-table-row flex justify-center capitalize shrink-0">
                    <div className="line-clamp-2">12341234124323</div>
                </td>
                <td className="admin-table-row flex justify-center capitalize shrink-0">
                    <div className="line-clamp-2">active</div>
                </td>
                <td className="admin-table-row px-44">
                    <div className="flex items-center justify-center gap-2 text-lg">
                        <button
                            className="hover:text-gray-500 bg-green-500 text-white w-20 rounded-sm"
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
    )
}

export default CategoryTable
