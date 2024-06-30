import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './redux/action/userAction.jsx';
import UserNavbar from './components/UserNavbar.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import PaymentSuccess from './pages/user/courses/components/PaymentSuccess.jsx';
import MemberShipSuccess from './pages/user/teachers/components/MemberShipSuccess.jsx';
import VideoCallPage from './components/chat/VideoCall.jsx';
import { FaTruckLoading } from 'react-icons/fa';
import CategoryList from './pages/user/courses/components/CategoryList.jsx';
import Instructors from './pages/admin/instructors/Instructors.jsx';
import CategoryLists from './pages/admin/Category/CategoryList.jsx';
import Footer from './components/Footer.jsx';

const Signup = lazy(() => import('./pages/auth/Signup.jsx'));
const UserHome = lazy(() => import('./pages/user/UserHome.jsx'));
const Login = lazy(() => import('./pages/auth/Login.jsx'));
const ForgetPassword = lazy(() => import('./pages/auth/ForgetPassword.jsx'));
const BecomeInstructorPage = lazy(() => import('./pages/user/BecomeInstructorPage.jsx'));
const UserProfile = lazy(() => import('./pages/user/profile/UserProfile.jsx'));
const Courses = lazy(() => import('./pages/user/courses/Courses.jsx'));
const CourseView = lazy(() => import('./pages/user/courses/CourseView.jsx'));
const TeachersList = lazy(() => import('./pages/user/teachers/TeachersList.jsx'));
const TeacherView = lazy(() => import('./pages/user/teachers/TeacherView.jsx'));
const Exam = lazy(() => import('./pages/user/courses/Exam.jsx'));
const AdminDash = lazy(() => import('./pages/admin/AdminDash.jsx'));
const InstructorRequests = lazy(() => import('./pages/admin/instructors/InstructorRequests.jsx'));
const InstructorHome = lazy(() => import('./pages/tutor/InstructorHome.jsx'));
const AddCourse = lazy(() => import('./pages/tutor/course/AddCourse.jsx'));
const CoursesList = lazy(() => import('./pages/admin/Courses/CoursesList.jsx'));
const CourseDetailPage = lazy(() => import('./pages/admin/Courses/CourseDetailPage.jsx'));
const AddCourseHome = lazy(() => import('./pages/tutor/course/AddCourseHome.jsx'));
const CourseList = lazy(() => import('./pages/tutor/course/CourseList.jsx'));
const InstructorView = lazy(() => import('./pages/admin/instructors/InstructorView.jsx'));
const DashBoard = lazy(() => import('./pages/tutor/dashboard/DashBoard.jsx'));
const AdminDashBoard = lazy(() => import('./pages/admin/dashBoard/DashBoard.jsx'));
const CreateExam = lazy(() => import('./pages/tutor/exams/CreateExam.jsx'));
const ExamCourseList = lazy(() => import('./pages/tutor/exams/ExamCourseList.jsx'));
const ChatHome = lazy(() => import('./pages/tutor/chat/ChatHome.jsx'));
const Notifications = lazy(() => import('./pages/tutor/notifications/Notifications.jsx'));

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user, 'this get user data--------------------------------------');
  useEffect(() => {
    if (!user) {
      console.log('get user data working in app.jsx');
      dispatch(getUserData()).then(() => console.log('user data fetched //////////////', user));
    }
  }, []);

  const ProtectRouter = ({ element }) => {
    const { user } = useSelector((state) => state.user);
    return user ? element : <Navigate to='/login' />;
  };

  return (
    <BrowserRouter>
      {user && user.role === 'student' ? <TopNavbar  /> : <UserNavbar />}
      <Suspense fallback={
        <div className='flex justify-center items-center'>
          <FaTruckLoading className='loading-spinner' />
        </div>}>
        <Routes>
          <Route
            path='/'
            element={
              user ? (
                user.role === 'admin' ? (
                  <Navigate to='/admin' />
                ) : user.role === 'instructor' ? (
                  <Navigate to='/instructor' />
                ) : (
                  <Navigate to='/home' />
                )
              ) : (
                <Navigate to='/index' />
              )
            }
          />
          {user && user.role === 'admin' ? (
            <Route path='/admin/*' element={<AdminRoutes />} />
          ) : (
            <Route path='/admin' element={<Navigate to='/' />} />
          )}
          {user && user.role === 'instructor' ? (
            <Route path='/instructor/*' element={<InstrucorRoutes />} />
          ) : (
            <Route path='/instructor' element={<Navigate to='/' />} />
          )}
          <Route path='/index' element={<UserHome />} />
          <Route path='/home' element={<UserHome />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot' element={<ForgetPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/course' element={<Courses />} />
          <Route path='/course/:id' element={<CourseView />} />
          <Route path='/becomeInstructor' element={<ProtectRouter element={<BecomeInstructorPage />} />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/course/paymentSuccess' element={<PaymentSuccess />} />
          <Route path='/teachers' element={<TeachersList />} />
          <Route path='/teacherView/:teacherId' element={<ProtectRouter element={<TeacherView />} />} />
          <Route path='/exam/:courseId' element={<ProtectRouter element={<Exam />} />} />
          <Route path='/test' element={<Notifications />} />
          <Route path='/call' element={<VideoCallPage />} />
          <Route path='/membership/paymentSuccess' element={<MemberShipSuccess />} />
          {/* Instructor Routes */}
      <Route path='/instructor' element={<DashBoard />} />
        </Routes>
          <Footer/>
      </Suspense>
    </BrowserRouter>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<AdminDash />} />
      <Route index element={<AdminDash />} />
      <Route path='dashboard' element={<AdminDashBoard />} />
      <Route path='categories' element={<CategoryLists />} />
      <Route path='requests' element={<InstructorRequests />} />
      <Route path='instructor-view/:id' element={<InstructorView />} />
      <Route path='instrutors' element={<Instructors />} />
      <Route path='students' element={<Instructors />} />
      <Route path='courses' element={<CoursesList />} />
      <Route path='courseView/:id' element={<CourseDetailPage />} />
    </Routes>
  );
}

function InstrucorRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />} />
      <Route index element={<DashBoard />} />
      <Route path='courses' element={<CourseList />} />
      <Route path='notification' element={<Notifications />} />
      <Route path='addCourse' element={<AddCourseHome />} />
      <Route path='dashboard' element={<DashBoard />} />
      <Route path='createExam' element={<CreateExam />} />
      <Route path='exam' element={<ExamCourseList />} />
      <Route path='chat' element={<ChatHome />} />
    </Routes>
  );
}

export default App;
