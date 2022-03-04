
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

const ResetPassword =  () => {
  const [user , setuser] = useState({
    email:"",oldPassword :"",newPassword:""
    })
  const navigate = useNavigate();

  const checkCredential = async(e) =>{
   
    const {email , oldPassword ,newPassword} = user ;
   
      e.preventDefault() ;

     
      const response =  await fetch(`http://localhost:80/admin/resetPassword`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email , oldPassword ,newPassword
        })
    });
    const awaited_response = await response.json();
    
    if(awaited_response.status === 200){
      toast.success("Password Changed Successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        navigate("/admin/app" , {replace:true});

      }else if(awaited_response.status === 400){
        toast.error("Invalid Credentials!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setuser({
            email:"",oldPassword :"",newPassword:""
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
    navigate("/admin/app", {replace:true});
  }
  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              {/* <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700"> */}
              <Card.Link  className="text-gray-700">
                <FontAwesomeIcon onClick={GotoHome} icon={faAngleLeft} className="me-2" style={{color : "blue", cursor : "pointer"}} /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" name = "email" value = {user.email} onChange= {ChangingCredential} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Current Password" name = "oldPassword" value = {user.oldPassword} onChange= {ChangingCredential}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="New Password" name = "newPassword" value = {user.newPassword} onChange= {ChangingCredential}/>
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

export default ResetPassword;