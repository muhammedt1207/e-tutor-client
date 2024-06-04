import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { acceptRequest } from "../../../redux/action/AdminActions";

const Modal = ({ toggleBlockOrUnBlockModal, data }) => {

  const disptach = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(
    status ? "true" : "false "
  );
  const handleSave = () => {
    if(selectedStatus=== ""){
        return;
    }
    console.log("selectedStatus now",selectedStatus)
    let isActive =selectedStatus==='true'
    console.log(isActive,"isactive fiinal value")
    disptach(acceptRequest({ requestId: data, status: 'true'})).then(() => toggleBlockOrUnBlockModal());
    
  };
  return (
    <div className=" bg-white p-5 rounded-lg absolute top-80 left-1/2 border z-50 shadow-2xl bg-opacity-100">
      <div className="flex w-full justify-between">
        <h1 className="text-lg font-bold ">Accept Request</h1>
        <AiOutlineClose
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={() => toggleBlockOrUnBlockModal()}
        />
      </div>
      <div className="flex gap-3 items-center my-2">
        <p className="py-5 shrink-0">Choose a Status</p>
        <select
          name="status"
          id="status"
          className="capitalize px-5 py-2 bg-gray-300 rounded-lg"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="true" className="capitalize">
            Accept
          </option>
          <option value="false" className="capitalize">
            block
          </option>
        </select>
      </div>
      <button
        className="bg-orange-400 py-3 px-3 rounded-md text-white uppercase w-full text-sm"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Modal;