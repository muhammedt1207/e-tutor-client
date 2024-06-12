import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { URL } from "../../../Common/api";
import Sidebar from "../../../components/admin/Sidebar";
import Table from "../components/Table";
import CircularPagination from "../../../components/CircularPagination";

const Instructors = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.instructor);

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [instructors, setInstructors] = useState([]);
  const [totalAvailableCustomers, setTotalAvailableCustomers] = useState("");
  const instructorsPerPage = 10; // Number of instructors per page

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
    const { data } = await axios.get(`${URL}/user/acceptedInstructor`);
    const customerData = data.data;
    setInstructors(customerData);
    setTotalAvailableCustomers(data.totalAvailableCustomers);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
    loadData();
  }, [searchParams]);

  const indexOfLastInstructor = page * instructorsPerPage;
  const indexOfFirstInstructor = indexOfLastInstructor - instructorsPerPage;
  const currentInstructors = instructors.slice(indexOfFirstInstructor, indexOfLastInstructor);
  const totalPages = Math.ceil(instructors.length / instructorsPerPage);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="mt-5 ml-5 font-bold text-2xl">Instructors</h1>
            <BreadCrumbs list={["Dashboard", "Instructors Lists"]} />
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
          {instructors && (
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200 text-orange-500">
                  <th className="admin-table-head w-20">No</th>
                  <th className="admin-table-head">Email</th>
                  <th className="admin-table-head">Profession</th>
                </tr>
              </thead>
              <tbody>
                {currentInstructors.map((customer, index) => {
                  const isLast = index === currentInstructors.length - 1;
                  return (
                    <Table
                      isLast={isLast}
                      index={index + 1 + (page - 1) * instructorsPerPage}
                      customer={customer}
                      key={index}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-center mt-5">
          <CircularPagination active={page} setActive={setPage} total={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Instructors;
