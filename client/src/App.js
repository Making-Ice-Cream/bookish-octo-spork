// import logo from './logo.svg';

import './App.css';
import  NavBar  from "./Components/NavBar";
import  Footer  from "./Components/Footer";
import  Crousel  from "./Components/Crousel";
import  WriteText  from "./Components/WriteText";
// import Login from "./Components/Login"
 import Signup from "./Components/Signup"
import Signin from "./NewComponents/Signin"
function App() {
  return (
    <>
   <NavBar />
    <WriteText />
   < Crousel />
   <Footer />
    {/* <Login /> 
    <Signup/>
   <Signin /> */}
   </>
  );
}

export default App;