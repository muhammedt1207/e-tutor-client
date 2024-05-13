import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai'; 

const Table = ({ customer,index }) => {
    console.log(customer,'---------------------------------------------------------------------------------');
  return (
    <tr className=' hover:bg-gray-200 active:bg-gray-300 cursor-pointer space-x-3 pt-6'>
      <td className="row flex items-center gap-4 ml-5 px-7 ">
        <div className=" overflow-clip flex justify-center items-center shrink-0">
        <p className="line-clamp-1 ">{index}</p>
        </div>
      </td>
      <td className="admin-table-row px-9 ">
        <p className="line-clamp-1 ">{customer.userName}</p>
      </td>
      <td className="admin-table-row flex justify-center capitalize shrink-0">
        <div className="line-clamp-2 ">{customer.email}</div>
        {/* <StatusComponent status={customer.isActive ? "Active" : "Blocked"} /> */}
      </td>
      {/* <td className="admin-table-row">
        {customer.createdAt
          ? .format(new Date(customer.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td> */}
      <td className="admin-table-row px-44 ">
        <div className="flex items-center justify-center gap-2 text-lg">
          <span
            className="hover:text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockUnBlockModal({
                id: customer._id,
                status: customer.isActive,
              });
            }}
          >
            <AiOutlineEdit />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default Table;
