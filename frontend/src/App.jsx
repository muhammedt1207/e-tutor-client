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
import { getUserData } from './redux/action/userAction.jsx'
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
import Instructors from './pages/admin/instructors/Instructors.jsx'
import InstructorHome from './pages/tutor/InstructorHome.jsx'
import AddCourse from './pages/tutor/course/AddCourse.jsx'
import Courses from './pages/user/courses/Courses.jsx'
import CoursesList from './pages/admin/Courses/CoursesList.jsx'
import CourseView from './pages/user/courses/CourseView.jsx'
import CourseCard from './pages/user/courses/components/CourseCard.jsx'
import CourseDetailPage from './pages/admin/Courses/CourseDetailPage.jsx'
import PaymentSuccess from './pages/user/courses/components/PaymentSuccess.jsx'
import AddCourseHome from './pages/tutor/course/AddCourseHome.jsx'
import CourseList from './pages/tutor/course/CourseList.jsx'
import InstructorView from './pages/admin/instructors/InstructorView.jsx'
import DashBoard from './pages/tutor/dashboard/DashBoard.jsx'
import AdminDashBoard from './pages/admin/dashBoard/DashBoard.jsx'
import CreateExam from './pages/tutor/exams/CreateExam.jsx'
import ExamCourseList from './pages/tutor/exams/ExamCourseList.jsx'
import Exam from './pages/user/courses/Exam.jsx'
import ExamSuccess from './pages/user/courses/components/ExamSuccess.jsx'
import TeachersList from './pages/user/teachers/TeachersList.jsx'
import TeacherView from './pages/user/teachers/TeacherView.jsx'
import MemberShipSuccess from './pages/user/teachers/components/MemberShipSuccess.jsx'
import ChatHome from './pages/tutor/chat/ChatHome.jsx'
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
const ProtectRouter=({element})=>{
  const {user}=useSelector(state=>state.user)
  return user ? element:<Navigate to='/login'/>
}
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
                <Navigate to="/admin" />
            ) : user.role == 'instructor' ? (
                <Navigate to="/instructor" />
            ) : (
                <Navigate to='/home' />
            )
        ) : (
            <Navigate to="/index" /> 
        )}
/>  
{
  (user && user.role=='admin')?(
    <Route path='/admin/*' element={<AdminRoutes/>} />
  ):(<Route path='/admin' element={<Navigate to='/'/>} />)
}
{
  (user && user.role=='instructor')?(
    <Route path='/instructor/*' element={<InstrucorRoutes/>}/>
  ):(
    <Route path='instructor' element={<Navigate to='/'/>} />
  )
}
<Route  path='/index' element={<UserHome/>} />
<Route path='/home' element={<UserHome/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/forgot' element={<ForgetPassword/>} />
<Route path='/login' element={<Login/>}/>
<Route path='/course' element={<Courses/>}/>
<Route path='/course/:id' element={<CourseView/>}/>
<Route path='/becomeInstructor' element={<ProtectRouter element={<BecomeInstructorPage/>}/>}/> 
<Route path='/userprofile' element={<UserProfile/>}/>
<Route path='/course/paymentSuccess' element={<ProtectRouter element={<PaymentSuccess/>}/>}/>
<Route path='/teachers' element={<TeachersList/>}/>
<Route path='/teacherView/:teacherId' element={<ProtectRouter element={<TeacherView/>}/>}/>
<Route path='/exam/:courseId' element={<ProtectRouter element={<Exam/>}/>}/>
<Route  path='/test' element={<TeacherView/>}/>
<Route path='/membership/paymentSuccess' element={<ProtectRouter element={<MemberShipSuccess/>}/>}/>
{/* Instroctor Routes*/}
<Route path='/instructor' element={<InstructorDash/>}/>
 </Routes>
   </BrowserRouter>
    </>
  )
}

function AdminRoutes(){
  return(
    <Routes>
      <Route path='/' element={<AdminDash/>}/>
      <Route index element={<AdminDash/>}/>
      <Route path='dashboard' element={<AdminDashBoard/>}/>
      <Route path='categories' element={<CategoryList/>} />
      <Route path='requests' element={<InstructorRequests/>}/>
      <Route path='instructor-view/:id' element={<InstructorView/>}/>
      <Route path='instrutors' element={<Instructors/>}/>
      <Route path='students' element={<Instructors/>}/>
      <Route path='courses' element={<CoursesList/>} />
      <Route path='courseView/:id' element={<CourseDetailPage/>}/>
    </Routes>
  )
}
function InstrucorRoutes(){
  return(
    <Routes>
      <Route path='/' element={<InstructorDash/>} />
      <Route index element={<DashBoard/>}/>
      <Route path='courses' element={<CourseList/>}/>
      <Route path='addCourse' element={<AddCourseHome/>}/>
      <Route path='dashboard' element={<DashBoard/>}/>
      <Route path='createExam' element={<CreateExam/>} />
      <Route path='exam' element={<ExamCourseList/>} />
      <Route path='chat' element={<ChatHome/>} />
      </Routes>
  )
}

export default App
