import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import RegisterStudent from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from "./signin_404_etc_pages/Login"
 import NotFound from './pages/Page404';
import Student from './pages/Student';
import NavBar from './Prev_Components/NavBar';
import  Footer  from "./Prev_Components/Footer";
import  Crousel  from "./Prev_Components/Crousel";
import  WriteText  from "./Prev_Components/WriteText";
import ForgotPassword from "./signin_404_etc_pages/ForgotPassword";
import Lock from "./signin_404_etc_pages/Lock";
// import NotFound from "./signin_404_etc_pages/NotFound";
import ResetPassword from "./signin_404_etc_pages/ResetPassword";
import ServerError from "./signin_404_etc_pages/ServerError";
import Signup from "./signin_404_etc_pages/Signup";
import React ,{useState,useContext} from 'react'
import {UserContext} from './App';
import Cookies from 'js-cookie';
import AddTeacher from './components/authentication/login/AddTeacher';
import ContactDev from './Prev_Components/ContactDev';
import Profile from  './Prev_Components/Profile/Profile';

export default function AdminRoutes() {
  const {state,dispatch} = useContext(UserContext);
  let cookie = Cookies.get('token');
  if(cookie !== "" && cookie !== null && cookie !== "undefined" && typeof cookie !== 'undefined'){
  fetch('http://localhost:80/admin/check', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        token:Cookies.get('token')
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log("insode routes")
      if(data.isvalid) dispatch({type:'USER',payload:true});
    })
    .catch((error) => {
      console.error('Error:', error);
    });


    


  }
    
  return useRoutes([
    {
      path: '/',
      element:  <><NavBar /><WriteText /><Crousel /><Footer /></>
    },
    {
      path: '/signin',
      element: state ? <Navigate to="/admin/app" /> : <Login />
    },
    
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path : '/forgotPassword',
      element: <ForgotPassword />
    },
    {
      path: "/404",
      element : <NotFound />
    },
    {
      path: "/lock",
      element :state ? <Lock /> : <Navigate to="/signin" />
    },
    {
      
        path: "/500",
        element : <ServerError />
      
    },

    {
      path: '/admin',
      
       element: state ? (!JSON.parse(sessionStorage.getItem("islocked")) ? <DashboardLayout /> :<Navigate to="/lock" />)  : <Navigate to="/signin" />,
      children: [
        { element: <Navigate to="/admin/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'student', element: <Student /> },
        { path: 'profile' , element: <Profile />}
       
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'fee_payment_manually', element: state ? (!JSON.parse(sessionStorage.getItem("islocked")) ?<Register /> :<Navigate to="/lock" />)  : <Navigate to="/signin" /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path:"/admin/new/teacher",
      element: state ? (!JSON.parse(sessionStorage.getItem("islocked")) ? <AddTeacher /> :<Navigate to="/lock" />)  : <Navigate to="/signin" />
    },
    {
      path:"/admin/new/student",
      element: state ? (!JSON.parse(sessionStorage.getItem("islocked")) ? <RegisterStudent /> :<Navigate to="/lock" />)  : <Navigate to="/signin" />
    },
    {
      path:"/contact/developers",
      element : <> <NavBar /><ContactDev /> <Footer />  </>
    },
    {
      path : '/resetPassword',
      element : state ? (!JSON.parse(sessionStorage.getItem("islocked")) ? <ResetPassword /> :<Navigate to="/lock" />)  : <Navigate to="/signin" />
    },
    
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}


// export default function Router(isLoggedIn) {
//   return useRoutes([
//     {
//       path: '/app',
//       element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
//       children: [
//         { path: '/dashboard', element: <DashboardApp /> },
//         { path: '/', element: <Navigate to="/app/dashboard" /> },
//       ],
//     },
//     {
//       path: '/',
//       element: !isLoggedIn ? <LogoOnlyLayout /> : <Navigate to="/app/dashboard" />,
//       children: [
//         { path: 'login', element: <Login /> },
//         { path: '/', element: <Navigate to="/login" /> },
//       ],
//     },
//   ]);
// }