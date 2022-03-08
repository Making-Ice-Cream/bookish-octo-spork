
import React , {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import "../AllCSS/pages.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Routes } from "../../routes";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let [email, setemail] = useState("");


  let navigate = useNavigate();
  const GoBack = ()=>{
    navigate("/");
  }
  const ChangingCredential = (e) =>{
     
      setemail(e.target.value);
     
  }

  const checkCredential = async(e) =>{
     e.preventDefault() ;

     
      const response =  await fetch(`http://localhost:80/admin/forgotPassword`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email
        })
    });
    const awaited_response = await response.json();
    
    if(awaited_response.status === 200){
     
      toast.success("Password Changed Successfully!, Please Check Your Email!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
       setemail("");
        

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
          setemail("");
      }
      else{
        navigate("/500" , {replace:true});
      }
    }

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              {/* <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700"> */}
              <Card.Link   className="text-gray-700">
              
                <FontAwesomeIcon style = {{cursor:"pointer","color":"blue" }}onClick={GoBack} icon={faAngleLeft} className="me-2" /> Back to homepage
                
            </Card.Link>
            </p>
            <Col  xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you  a temperory  password!</p>
                <Form>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control required autoFocus type="email" placeholder="john@company.com" name = "email" value = {email} onChange= {ChangingCredential} />
                    </InputGroup>
                  </div>
                  <Button variant="primary" type="submit" className="w-100" onClick = {checkCredential}>
                    Recover password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
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
    </main>
  );
};

export default ForgotPassword ;