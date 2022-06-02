import { useState , useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { useNavigate } from "react-router-dom";
// import "./delete"
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accountInfo , setaccountInfo] = useState({})


   useEffect(async ()=>{

    let user_data = window.sessionStorage.getItem("Logged_in_as");
    if(user_data == null || user_data == undefined){
      alert("An Error Occured!");
      navigate("/");
    }
      
    let final_data = user_data.slice(3)
    let url = "";
    switch(final_data){
      case 'Admin':
            url = "http://localhost:80/admin/getAccountDetails";
         break;

      case 'Student':
           url = "http://localhost:80/student/getAccountDetails"
        break;
      case 'Teacher':

        break;

      case 'Parent':

        break;

      default:


    }
   
    const response =  await fetch(url,{
      method : "POST",
      headers :{
          "Accept":"application/json",
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        token:Cookies.get('token') 
      })
  });
  const awaited_response = await response.json();

  let obj = {
    displayName : awaited_response.name,
    email : awaited_response.email,
    photoURL : '/static/mock-images/avatars/avatar_18.jpg',
    role:final_data
  }
  setaccountInfo(obj);

   },[]);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} data = {accountInfo}  />
      <DashboardSidebar data = {accountInfo} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
