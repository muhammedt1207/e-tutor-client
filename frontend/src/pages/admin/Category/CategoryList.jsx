import React, { useState } from 'react'
import SideBar from '../../../components/SideBar'
import SearchBar from '../components/SearchBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Sidebar from '../../../components/admin/Sidebar'
import CategoryTable from './CategoryTable'

const CategoryList = () => {

  const [categories, setCategories] = useState([
    {
      id: 1,
      categoryName: 'Electronics',
      createdBy: 'Admin1',
      createdDate: '2024-05-10T12:30:00Z', // Example date format
      status: 'Active'
    },
    {
      id: 2,
      categoryName: 'Clothing',
      createdBy: 'Admin2',
      createdDate: '2024-05-09T10:45:00Z', // Example date format
      status: 'Inactive'
    },
    {
      id: 3,
      categoryName: 'Books',
      createdBy: 'Admin1',
      createdDate: '2024-05-08T14:20:00Z', // Example date format
      status: 'Active'
    },
    // Add more categories as needed
  ]);
  
 
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='w-full'>
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Categories</h1>
          <BreadCrumbs list={["Dahsboard", "Categories"]} />
        
        </div>
      <div className='px-5'>
        <button className=' bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 '>Add Category</button>
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
      <table className="w-full min-w-max table-auto">
            <thead className="font-normal">
              <tr className="border-b border-gray-200 text-orange-500">
                <th className="admin-table-head  w-20" >No</th>
                <th className="admin-table-head ">Catogory Name</th>
                <th className="admin-table-head ">Created By</th>
                <th className="admin-table-head">Status</th>
                <th className='admin-table-head'>Edit</th>
             
              </tr>
            </thead>
            <tbody>
              {categories && categories.map((request, index) => {
                const isLast = index === categories.length - 1;
                return (
                  <CategoryTable
                    isLast={isLast}
                    index={index+1}
                    customer={request}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
    </div>
  )
}

export default CategoryList
