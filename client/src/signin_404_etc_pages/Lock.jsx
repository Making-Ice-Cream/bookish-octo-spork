
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Image, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import "./scss/volt.scss";
// import { Routes } from "../../routes";
import BgImage from "../images/signin.svg";
import Profile3 from "../images/team/profile-picture-3.jpg";
import { useNavigate } from "react-router-dom";
import "../AllCSS/pages.css";
import Cookies from 'js-cookie'
import {UserContext} from '../App';

const Lock =  () => {
  sessionStorage.setItem('islocked', true);
  // console.log(JSON.parse(sessionStorage.getItem("islocked")))
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  const [password , setpassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";
  const passwordIconColor = showPassword ? "#262B40" : "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const gotohome = ()=>{
    sessionStorage.clear();
    Cookies.remove('token');
    dispatch({type:'USER',payload:false});
    navigate("/");
  }
 
  const gotoApp = () =>{
    fetch('http://localhost:80/checkpassword', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        token:Cookies.get('token'),
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      if(data.status === 200) {
        console.log(data)
        sessionStorage.setItem('islocked', false);
        navigate("/admin/app",{replace:true});
        
      }
      else if(data.status === 500){
        sessionStorage.clear();
        Cookies.remove('token');
        dispatch({type:'USER',payload:false});
        navigate("/500",{replace:true});
      }
      else{
        toast.error("Invalid Credential!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setpassword("");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error("An Error Occurred!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        navigate("/500",{replace:true});
    });



  }
  const ChangingCredential = (e) =>{
     setpassword(e.target.value);
  }

  return (
    <main>
      <section className="vh-lg-100 bg-soft d-flex align-items-center my-4">
        <Container>
          <p className="text-center">
            {/* <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700"> */}
            <Card.Link   className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" onClick = {gotohome} style={{cursor:"pointer" , color:"blue"}} /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <div className="user-avatar large-avatar mx-auto mb-3 ">
                    <Image src={Profile3} className="rounded-circle"  />
                  </div>
                  <h3 className="mb-3">{sessionStorage.getItem('name')}</h3>
                  <p className="text-gray">Better to be safe than sorry.</p>
                </div>
                <Form className="mt-5">
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type={passwordInputType} onChange= {ChangingCredential}  name = "password" value = {password} placeholder="Password" />
                      <InputGroup.Text onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon color={passwordIconColor} icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button onClick = {gotoApp} variant="primary"  className="w-100">
                    Unlock
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      />
      </section>
    </main>
  );
};

export default Lock ;