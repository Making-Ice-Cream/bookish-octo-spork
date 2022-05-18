// import logo from './logo.svg';
// import "./scss/volt.scss";
// import {
//   Routes,
//   Route,
//   Outlet
// } from "react-router-dom";

import './App.css';
// import DashboardLayout from './layouts/dashboard';
// import DashboardApp from './pages/DashboardApp';
// import  NavBar  from "./Prev_Components/NavBar";
// import  Footer  from "./Prev_Components/Footer";
// import  Crousel  from "./Prev_Components/Crousel";
// import  WriteText  from "./Prev_Components/WriteText";
// // import Login from "./Components/Login"
// import Products from './pages/Products';
// import Blog from './pages/Blog';
// import User from './pages/User';

// import Student from './pages/Student';
// import Login from "./signin_404_etc_pages/Login"
// import ForgotPassword from "./signin_404_etc_pages/ForgotPassword";
// import Lock from "./signin_404_etc_pages/Lock";
// import NotFound from "./signin_404_etc_pages/NotFound";
// import ResetPassword from "./signin_404_etc_pages/ResetPassword";
// import ServerError from "./signin_404_etc_pages/ServerError";
// import Signup from "./signin_404_etc_pages/Signup";
// import Signin from "./NewComponents/Signin"
// function App() {
//   return (
//     <Router>
//     <div>
//       <Switch>
//       <Route exact path="/">
//               <NavBar />
//               <WriteText />
//               <Crousel />
//               <Footer />
//         </Route>
//         <Route path="/about">
//               <NavBar />
//               <WriteText />
//               <Crousel />
//               <Footer />
//         </Route>
//         <Route path="/signin" component={(props) => < Login {...props}/>} />

//          <Route path = "/forgotPassword" >
//            <ForgotPassword />
//         </Route>

//            <Route path = "/about-us" >
//                 <ServerError />
//            </Route>

//            <Route path = "/signup" >
//                 <Signup />
//              </Route>   

//         <Route path="/*">
//               <NotFound />
//         </Route>
//       </Switch>
//     </div>
//   </Router>
//   );
// }

// export default App;




// 

// routes
// import { useRoutes } from 'react-router-dom';
// import {useSelector} from 'react-redux';
import AdminRoutes from './routes';
import React , {useReducer,useEffect} from 'react';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// import './App.css';
// components
import { Widget ,addResponseMessage  } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { createContext } from 'react';
import { initialState ,reducer } from './reducer/useReducer';
import './AllCSS/chatBot.css'
export const UserContext = createContext();
// ----------------------------------------------------------------------



export default function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const routing = useRoutes(Router(isLoggedIn));

  // for bot
  
  useEffect(() => {
    addResponseMessage('Hello, I am Dani. How may I help You?');
  }, []);

  const handleNewUserMessage = async(newMessage) => {
    const response = await fetch("https://bot-chat-python.herokuapp.com/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify({
        "name":newMessage
      })
    });

    const res = await response.json();
    console.log(res);
    addResponseMessage(res.message);
  };
  return (
     
    <UserContext.Provider value = {{state,dispatch}}>
    
    <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <BaseOptionChartStyle />
    <AdminRoutes />
    </ThemeConfig>
    <Widget 
    handleNewUserMessage={handleNewUserMessage}
    senderPlaceHolder = "Type Your Query.."
    title = "Your Assistant"
    subtitle = "Welcome to Apni Coaching"
    profileAvatar = "https://static.vecteezy.com/system/resources/thumbnails/002/586/938/small/woman-cartoon-character-portrait-brunette-female-round-line-icon-free-vector.jpg"
    profileClientAvatar = "https://img.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg"
    />
    </UserContext.Provider>       
  );
}
