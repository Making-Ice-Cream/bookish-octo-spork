import React from 'react';
import logo from '../images/logo.png'; // Tell webpack this JS file uses this image
import "../AllCSS/logo.css"
import "../AllCSS/buttons.css"

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
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About-Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact-Developer</a>
          </li>
          
        </ul>
        <div className='d-flex' >
         <div className="buttons">
        <button type="button" className="btn  mx-4">Signup As Student</button> 
        </div>
        <div className="btn-group">
        <button type="button" className="btn btn-warning Login_text">LOGIN AS</button>
        <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Administrator</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Teacher</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Student</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Parent</a></li>
        </ul>
        </div>
         

        </div>
      </div>
    </div>
  </nav>
  )};

export default NavBar;