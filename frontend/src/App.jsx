import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './pages/auth/Signup.jsx'
import UserHome from './pages/user/UserHome.jsx'
import UserNavbar from './components/UserNavbar.jsx'
import TopNavbar from './components/TopNavbar.jsx'
import Login from './pages/auth/Login.jsx'
import BecomeInstructorPage from './pages/user/BecomeInstructorPage.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from './redux/action/Auth/userAction.jsx'
import {Route,Router,BrowserRouter, Routes, Navigate} from 'react-router-dom'
import BecomeInstructorForm from './pages/user/BecomeInstructorForm.jsx'
import Sample from './components/Sample.jsx'
import AdminDash from './pages/admin/AdminDash.jsx'
import InstructorRequests from './pages/admin/instructors/InstructorRequests.jsx'
import UserProfile from './pages/user/profile/UserProfile.jsx'
import ForgetPassword from './pages/auth/ForgetPassword.jsx'
import InstructorDash from './pages/tutor/InstructorDash.jsx'
import CategoryList from './pages/admin/Category/CategoryList.jsx'
import AddOrEditCategory from './pages/admin/Category/AddOrEditCategory.jsx'
function App() {
const {user}=useSelector((state)=>state.user)
const dispatch=useDispatch()

console.log(user,'this get user data--------------------------------------');
useEffect(()=>{
  if(!user){
    console.log('get user data working in app.jsx');
    dispatch(getUserData())
    .then(()=>console.log('user data fetched //////////////',user))
  }
},[])
  return (
    <>
   <BrowserRouter>  
   {user && user.role=='student' ?<TopNavbar/>:<UserNavbar/>}

   <Routes>
   <Route
    path='/'
    element={
        user ? (
            user.role == 'admin' ? (
                <Navigate to="/reqeusts" />
            ) : user.role == 'tutor' ? (
                <Navigate to="/tutor" />
            ) : (
                <Navigate to='/home' />
            )
        ) : (
            <Navigate to="/index" /> 
        )}
/>  
{
  (user && user.role=='admin')?(
    <Route path='/admin' element={<Navigate to='/admin-dash'/>} />
  ):(<Route path='/admin' element={<Navigate to='/reqeusts'/>} />)
}
<Route  path='/index' element={<UserHome/>} />
<Route path='/home' element={<UserHome/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/forgot' element={<ForgetPassword/>} />
<Route path='/login' element={<Login/>}/>
<Route path='/becomeInstructor' element={<BecomeInstructorPage/>}/> 
<Route path='/userprofile' element={<UserProfile/>}/>


{/* Admin Routes*/}
<Route path='/admin-dash' element={<InstructorRequests/>}/>
<Route path='/reqeusts' element={<InstructorRequests/>}/>
<Route path='/categories' element={<CategoryList/>}/>


{/* Instructor Routes*/}
<Route path='/instructorDash' element={<InstructorDash/>}/>
<Route path='/test' element={<AddOrEditCategory/>}/>
 </Routes>
   </BrowserRouter>
    {/* <TopNavbar/> 
      <UserNavbar/> */}
      {/* <Signup/> */}
      {/* <UserHome/> */}
      {/* <Login/> */}
      {/* /<BecomeInstructorPage/> */}
      {/* <BecomeInstructorForm/> */}
      {/* <Sample/> */}
      {/* <AdminDash/> */}
    </>
  )
}

export default App
