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
import React , {useReducer} from 'react';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// import './App.css';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { createContext } from 'react';
import { initialState ,reducer } from './reducer/useReducer';
export const UserContext = createContext();
// ----------------------------------------------------------------------




export default function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const routing = useRoutes(Router(isLoggedIn));
  return (
     
    <UserContext.Provider value = {{state,dispatch}}>
    
    <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <BaseOptionChartStyle />
    <AdminRoutes />
    </ThemeConfig>
   
    </UserContext.Provider>       
  );
}
