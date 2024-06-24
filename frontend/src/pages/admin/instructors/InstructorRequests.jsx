import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../components/BreadCrumbs'
import SearchBar from '../components/SearchBar'
import FilterArray from '../components/FilterArray'
import axios from 'axios'
import Sidebar from '../../../components/admin/Sidebar'
import { config } from '../../../Common/configurations'
import { useDispatch } from 'react-redux'
import { URL } from '../../../Common/api'
import RequestTable from '../components/RequestTable'

const InstructorRequests = () => {
    const dispatch=useDispatch()
    const [Requests,setRequests]=useState([])
    const [searchParams,setSearchParams]=useState('')
    const loadData = async () => {
        const {data} = await axios.get(
          `${URL}/user/instructor`
         ,config 
        );
        console.log(data,"///////////////")
        const customerData = data.data
        console.log(customerData,'..............');
        setRequests(customerData);
        console.log(Requests,'z6zz6666^^^^^^^^^^^^^^^^^');
      };
      
      useEffect(() => {
        loadData();
      }, []);
  return (
    <div className='flex '>
    <Sidebar/>
    <div className='w-full'>
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Instructor Requests</h1>
          <BreadCrumbs list={["Dahsboard", "Instructors Requests"]} />
        
        </div>
      </div>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
        //   handleClick={handleFilter}
        //   search={search}
        //   setSearch={setSearch}
        />
      </div>
      <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg ml-5 mr-5 mt-3">
       
        {Requests && (
          <table className="w-full min-w-max table-auto">
            <thead className="font-normal">
              <tr className="border-b border-gray-200 text-orange-500">
                <th className="admin-table-head  w-20" >No</th>
                <th className="admin-table-head w-44">Email</th>
                <th className="admin-table-head ">Profession</th>
                <th className="admin-table-head">Actions</th>
             {/*<th className="admin-table-head">Joined</th>
                <th className="admin-table-head">Action</th>*/}
              </tr>
            </thead>
            <tbody>
              {Requests && Requests.map((request, index) => {
                const isLast = index === Requests.length - 1;
                return (
                  <RequestTable
                    isLast={isLast}
                    index={index+1}
                    customer={request}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  )
}

export default InstructorRequests
