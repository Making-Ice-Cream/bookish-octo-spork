import React from "react";
import {

  MDBRow,
  MDBCol,

  MDBBtn,
  MDBInput

} from "mdb-react-ui-kit";
import "../AllCSS/Login.css";
const Login = (props) => {
  return (


    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          <div className="text">Log in As Student</div>
          <div className="image"></div>
        </div>
        <form>
          <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
          <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

          <MDBRow className='mb-4'>

            <MDBCol>
              <a href='#!'>Forgot password?</a>
            </MDBCol>
            <MDBCol>
              <a href='#!'>Sign up for Student?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn type='submit' >
            Sign in
          </MDBBtn>
        </form>
      </div>
    </div>
  );
}




export default Login;
