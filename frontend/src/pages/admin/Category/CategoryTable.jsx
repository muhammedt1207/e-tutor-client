import React, { useState } from 'react'
import Modal from '../components/Modal';
import { format } from 'date-fns'
import { AiOutlineEdit } from 'react-icons/ai';
import AddOrEditCategory from './AddOrEditCategory';

const CategoryTable = ({ index, category, modal }) => {
    const handleEdit = async () => {
        modal(category)
    }
    return (
        <>
            <tr className='hover:bg-gray-200 active:bg-gray-300 cursor-pointer space-x-3 mt-6'>
                <td className=" gap-4 ml-5 px-7">
                    <div className="overflow-clip flex justify-center items-center shrink-0">
                        <p className="line-clamp-1">{index}</p>
                    </div>
                </td>
                <td className="capitalize shrink-0 flex justify-center ">
                    <div className="overflow-clip flex justify-center mr-5 shrink-0 w-64 ">
                        <p className="line-clamp-2">{category.categoryName}</p>
                    </div>
                </td>
                <td className="admin-table-row justify-center capitalize shrink-0">
                    <div className="line-clamp-2 ml-24  mb-2">{format(new Date(category.createdAt), "dd-MM-yyyy")}</div>
                </td>
                <td className="admin-table-row  capitalize shrink-0 flex justify-center ">
                    <div className="line-clamp-2 mr-6">active</div>
                </td>
                <td className="admin-table-row px-44">
                    <div className="flex items-center justify-center gap-2 text-lg ml-12">
                        <button
                            className="hover:text-gray-500 text- w-20 rounded-sm"
                            onClick={handleEdit}
                        >
                            <AiOutlineEdit />
                        </button>
                    </div>
                </td>
            </tr>

        </>
    )
}

export default CategoryTable
