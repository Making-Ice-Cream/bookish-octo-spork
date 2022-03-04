
import React , {useState,useContext  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { useLocation} from 'react-router-dom';
// import "./index1.css"
import "../AllCSS/pages.css";
import BgImage from "../images/Img.svg";
// import { Routes } from "../comp/Routes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import {UserContext} from '../App';

const Login =  (props) => {
  const {state,dispatch} = useContext(UserContext);
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const [user , setuser] = useState({
     email:"",password :""
     })

  const [buttonProperty, setbuttonProperty] = useState (false);
 
  const GotoHome = () => {
    navigate("/");
  }

  const ChangingCredential = (e) =>{
    let input_name = e.target.name ;
    let  value = e.target.value ;
    setuser({...user , [input_name]:value})
  }
 
  const ForgotPass = () =>{
    navigate("/forgotPassword");
  }
  // const validEmail = (email)=>{
  //   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if(email.match(mailformat)){
  //     return true;
  //   }
  //   return false ;
  // }

  //toast continer
  


  //

  const checkCredential = async(e) =>{
    // toast("Wow so easy!");
    // console.log("Hello");
    const {email , password} = user ;
    
   

      setbuttonProperty(true);



      e.preventDefault() ;

     
      const response =  await fetch(`http://localhost:80/admin/login`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email,password 
        })
    });
    const awaited_response = await response.json();
    
    if(awaited_response.status === 200){
      toast.success("Login Sucessfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        
        // console.log(awaited_response.token);

        Cookies.set('token', awaited_response.token, { expires: 1, path: '' })
        
        dispatch({type:'USER',payload:true})
        localStorage.setItem("image" , JSON.stringify(awaited_response.imageurl));
        localStorage.setItem("name" , JSON.stringify(awaited_response.name));
        localStorage.setItem("user_email" , JSON.stringify(email));

        window.sessionStorage.setItem("user_email" , email);
        window.sessionStorage.setItem("name" , awaited_response.name);
        window.sessionStorage.setItem("Logged_in_as", location.state.name);
        

        navigate('/admin/app',{replace:true});


    }else if(awaited_response.status === 404){
      toast.error("Invalid Email or Password", {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      setuser({email:"",password:""});
      setbuttonProperty(false);

    }else if(awaited_response.status === 500){
       console.log(awaited_response)
      navigate('/500',{replace:true});
    }

  }

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
          
              <Card.Link  className="text-gray-700">
              
                <FontAwesomeIcon onClick={GotoHome} icon={faAngleLeft} className="me-2" style={{color : "blue", cursor : "pointer"}} /> Back to homepage
                
              </Card.Link>
            
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in {location.state == null ? window.sessionStorage.getItem("Logged_in_as")   : location.state.name}</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus onChange= {ChangingCredential} required type="email" placeholder="example@company.com" name = "email" value = {user.email} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required onChange= {ChangingCredential} type="password" placeholder="Password" name = "password" value = {user.password} />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end" style = {{cursor : "pointer"}} onClick = {ForgotPass}to = "/forgotPassword">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button disabled = {buttonProperty} variant="primary" type="submit" className="w-100" onClick = {checkCredential}>
                    Sign in
                  </Button>
                </Form>

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
                      
                <ToastContainer />

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>

                 
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default Login;