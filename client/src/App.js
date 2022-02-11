// import logo from './logo.svg';
// import "./scss/volt.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';
import  NavBar  from "./Components/NavBar";
import  Footer  from "./Components/Footer";
import  Crousel  from "./Components/Crousel";
import  WriteText  from "./Components/WriteText";
// import Login from "./Components/Login"
 import Login from "./pages/Login"
 import ForgotPassword from "./pages/ForgotPassword";
import Lock from "./pages/Lock";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import ServerError from "./pages/ServerError";
import Signup from "./pages/Signup";
// import Signin from "./NewComponents/Signin"
function App() {
  return (
    <Router>
    <div>
      <Switch>
      <Route exact path="/">
              <NavBar />
              <WriteText />
              <Crousel />
              <Footer />
        </Route>
        <Route path="/about">
              <NavBar />
              <WriteText />
              <Crousel />
              <Footer />
        </Route>
        <Route path="/signin" component={(props) => < Login {...props}/>} />

         <Route path = "/forgotPassword" >
           <ForgotPassword />
        </Route>

           <Route path = "/about-us" >
                <ServerError />
           </Route>

           <Route path = "/signup" >
                <Signup />
             </Route>   

        <Route path="/*">
              <NotFound />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;