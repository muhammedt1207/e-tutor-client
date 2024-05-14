import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar'
import SearchBar from '../components/SearchBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Sidebar from '../../../components/admin/Sidebar'
import CategoryTable from './CategoryTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../redux/action/admin/Categories'
import AddOrEditCategory from './AddOrEditCategory'
import { Modal } from '@material-ui/core'

const CategoryList = () => {
  const dispatch=useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [editCategory,setEditCategory]=useState({})
  const{data,error,loading}=useSelector((state)=>state.category)
  const [categories, setCategories] = useState([]);
 const [showTable,setShowTable] = useState(true)

  useEffect(()=>{
   const result= dispatch(getAllCategories())
    .then(()=>{
      console.log(result,'......');
      console.log(data,'category all datas',error);
    })
  },[])
  const modal=async(data)=>{
    console.log(data,'+++++++++++++++++++++++++++++++++');
    setShowTable(false)
    setShowModal(true)
    setEditCategory(data)
  }
  const handleModalClose=async()=>{
    setShowTable(true)
    setShowModal(false)
    
  }
 
  return (
    <>
    {showTable && (
    <div className='flex'>
      <Sidebar/>
      <div className='w-full'>
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Categories</h1>
          <BreadCrumbs list={["Dahsboard", "Categories"]} />
        
        </div>
      <div className='px-5'>
        <button className=' bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-5 ' onClick={modal}>Add Category</button>
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
              {data && data.map((category, index) => {
                const isLast = index === categories.length - 1;
                return (
                  <CategoryTable
                    isLast={isLast}
                    index={index+1}
                    category={category}
                    key={index}
                    modal={modal}
                  />
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
    
    </div>)}
    {showModal && (
                <AddOrEditCategory category={editCategory} handleModal={handleModalClose}/>
            )}
    </>
  )
}

export default CategoryList
