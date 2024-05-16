import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import { AiOutlinePlus } from "react-icons/ai";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import axios from "axios";
import FilterArray from "../components/FilterArray";
import { URL } from "../../../Common/api";
import SideBar from "../../tutor/components/SideBar";
import Sidebar from "../../../components/admin/Sidebar";
import instructor from "../../../redux/reducers/instructor";



const Instructors = () => {
  const dispatch = useDispatch();

  // const { customers, loading, error, totalAvailableUsers } = useSelector(
  //   (state) => state.customers
  // );
  const {data,loading,error}=useSelector((state)=>state.instructor)

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const toggleBlockUnBlockModal = (data) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
    console.log("data inside the toggle",data)
  };

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [Instructors,setInstructors]=useState([])
  const [totalAvailableCustomers,setTotalAvailableCustomers]=useState("")

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };
  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingDate");
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };
  const loadData = async () => {
    const { data } = await axios.get(
      `${URL}/user/acceptedInstructor`
    );
    console.log(data,"///////////////")
    const customerData = data.data
    setInstructors(customerData);
    console.log(Instructors,'dkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    setTotalAvailableCustomers(totalAvailableCustomers);
  };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
    loadData();
  }, [searchParams]);

  
  return (
    <div className="flex">  
    <Sidebar/> 
     <div className="w-full ">
     
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Instructors</h1>
          <BreadCrumbs list={["Dahsboard", "Instructors Lists"]} />
          {/* <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={handleFilter}
          /> */}
        </div>

      </div>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
      
      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg ml-5 mr-5 mt-3">
       
        {Instructors && (
          <table className="w-full min-w-max table-auto">
            <thead className="font-normal">
              <tr className="border-b border-gray-200 text-orange-500">
                <th className="admin-table-head  w-20" >No</th>
                {/* <th className="admin-table-head w-44">Name</th> */}
                <th className="admin-table-head ">Email</th>
                <th className="admin-table-head">Profession</th>
             {/*<th className="admin-table-head">Joined</th>
                <th className="admin-table-head">Action</th>*/}
              </tr>
            </thead>
            <tbody>
              { Instructors.length>0 && Instructors.map((customer, index) => {
                const isLast = index === Instructors.length - 1;
                return (
                  <Table
                    isLast={isLast}
                    index={index+1}
                    customer={customer}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="py-5">
     
      </div>
    </div>
    </div>

  );
};

export default Instructors;