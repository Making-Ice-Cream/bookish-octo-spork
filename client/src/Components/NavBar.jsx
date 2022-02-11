import React from 'react';
import logo from '../images/logo.png'; // Tell webpack this JS file uses this image
import "../AllCSS/logo.css"
import "../AllCSS/buttons.css"
import { Link } from 'react-router-dom';

const NavBar = () => {
  return ( 
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
    <div className="container-fluid mx-2">
      <img src={logo} alt=""  width={"110px"} height={"90px"}/>
      <a className="navbar-brand mx-1" href="#"><span className="multicolortext">Apni Coaching</span></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to = "/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about-us">About-Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact-developers">Contact-Developer</Link>
          </li>
          
        </ul>
        <div className='d-flex' >
         <div className="buttons">
        <Link type="button" className="btn  mx-4" to = "/signup"  >Signup As Student</Link> 
        </div>
        <div className="btn-group">
        <button type="button" className="btn btn-warning Login_text">LOGIN AS</button>
            <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to = {{pathname : "/signin", state : "as Admin" }}>Administrator</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to = {{pathname : "/signin", state : "as Teacher" }}>Teacher</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to = {{pathname : "/signin", state : "as Student" }}>Student</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to = {{pathname : "/signin", state : "as Parent" }}>Parent</Link></li>
            </ul>
        </div>
         

        </div>
      </div>
    </div>
  </nav>
  )};

export default NavBar;