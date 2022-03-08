
import React , {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { Routes } from "../../routes";
import "../AllCSS/pages.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BgImage from "../images/Img.svg";

const ForgotPassword_using_Link =  () => {
  const [user , setuser] = useState({
    newPassword :"",confirmPassword:""
    })
  const navigate = useNavigate();

  const checkCredential = async(e) =>{
   
    const {newPassword ,confirmPassword} = user ;

    if(newPassword !== confirmPassword){
      alert("Both Password Must be same");
      return;
    }
    e.preventDefault() ;

     
      const response =  await fetch(`http://localhost:80/admin/updatePassword`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          password : newPassword,
          email : JSON.parse(window.sessionStorage.getItem("email")).replace(/(^"|"$)/g, ''),
          token : JSON.parse(window.sessionStorage.getItem("token")).replace(/(^"|"$)/g, '')
        })
    });
    const awaited_response = await response.json();
    // console.log(awaited_response)

    if(awaited_response.status === 201){
      alert("Password Changed Successfully!, Now Redirecting to Dashboard")
        window.sessionStorage.clear();
        navigate("/" , {replace:true});

      }else if(awaited_response.status >= 400 && awaited_response.status < 500){
        toast.error("Invalid Operation!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setuser({
            newPassword:"" ,confirmPassword:""
            })
      }
      else{
        navigate("/500" , {replace:true});
      }
    }

  const ChangingCredential = (e) =>{
    let input_name = e.target.name ;
    let  value = e.target.value ;
    setuser({...user , [input_name]:value})
  }

  const GotoHome = () => {
    navigate("/", {replace:true});
  }
  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              {/* <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700"> */}
              <Card.Link  className="text-gray-700">
                <FontAwesomeIcon onClick={GotoHome} icon={faAngleLeft} className="me-2" style={{color : "blue", cursor : "pointer"}} /> Back to Home
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${BgImage})`}}>
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form>
                  
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="New Password" name = "newPassword" value = {user.newPassword} onChange= {ChangingCredential}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" name = "confirmPassword" value = {user.confirmPassword} onChange= {ChangingCredential}/>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick = {checkCredential}>
                    Reset password
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
                      
                <ToastContainer />
      </section>
    </main>
  );
};

export default ForgotPassword_using_Link;