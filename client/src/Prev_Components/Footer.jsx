import React , {useState} from 'react';
import { MDBBtn , MDBFooter,MDBCol,MDBInput,MDBContainer,MDBRow, MDBIcon} from 'mdb-react-ui-kit';
const Footer = () => {

  const [email_footer, setemail_footer] = useState("");

  async function submitData_footer(e) {
    e.preventDefault();
    const response =  await fetch(`http://localhost:80/common/subscribeNewsletter`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email : email_footer 
        })
     });
    
    const awaited_response = await response.json();

    if(awaited_response.status === 200){
      alert(awaited_response.message);
      setemail_footer(" ");
    }
    else{
      alert(awaited_response.message);
      setemail_footer(" ");
    }
  }

  function assignEmail_footer(e) {
    setemail_footer(e.target.value);
  }




    return (

       
        <div className=" w-100">
          
          <MDBFooter
                  className="text-center text-lg-start text-white "
                  style={{backgroundColor: "#929fba"}}
                  >
           
            <div className="container p-4 pb-0">
             
              <section className="">
               
                <div className="row">
                
                  <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                      Apni Coaching
                    </h6>
                    <p>
                    Inspired to help you learn with ease and fun. We are here to help you
                      achieve whatever you aspire.
                    </p>
                  </div>
                  
                  <hr className="w-100 clearfix d-md-none" />
        
               
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                    <p>
                      <a className="text-white">Attendence</a>
                    </p>
                    <p>
                      <a className="text-white">Video Call</a>
                    </p>
                    <p>
                      <a className="text-white">Assignments</a>
                    </p>
                  </div>
                  
        
                  <hr className="w-100 clearfix d-md-none" />
        
                  
                  <hr className="w-100 clearfix d-md-none" />
        
                  
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                    <p><i className="fas fa-home mr-3"></i> Jalandhar, PUB-144011, IN</p>
                    <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                    <p><i className="fas fa-phone mr-3"></i> +91 6375717641</p>
                   
                  </div>
                  
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
        
                    
                    
        
                   
                    
                      
                      <MDBBtn size='lg' className='m-1' floating style={{ backgroundColor: '#3b5998' }} href='#'>
                             <MDBIcon fab icon='facebook' />
                      </MDBBtn>

                      <MDBBtn size='lg' className='m-1' floating style={{ backgroundColor: '#55acee' }} href='#'>
                             <MDBIcon fab icon='twitter' />
                      </MDBBtn>
                  
                      <MDBBtn size='lg' className='m-1' floating style={{ backgroundColor: '#dd4b39' }} href='#'>
                             <MDBIcon fab icon='google' />
                      </MDBBtn>
                
                    
                      <MDBBtn size='lg' className='m-1' floating style={{ backgroundColor: '#ac2bac' }} href='#'>
                             <MDBIcon fab icon='instagram' />
                      </MDBBtn>
        
                   
                    

                      <MDBBtn size='lg' className='m-1' floating style={{ backgroundColor: '#0082ca' }} href='#'>
                             <MDBIcon fab icon='linkedin' />
                      </MDBBtn>
                    
                    
                      <MDBBtn size='lg' className='m-1' floating style={{ backgroundColor: '#333333' }} href='#'>
                             <MDBIcon fab icon='github' />
                      </MDBBtn>
                  </div>
                </div>
                
              </section>
             
            </div>
            <div className="container p-4 pb-0">
    
    <section className="">
      
       
        <div className="row d-flex justify-content-center">
          
          
          
          <MDBContainer className='p-4 pb-0'>
        <form action=''>
          <MDBRow>
            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <p className='pt-2'>
                <strong>Sign up for our newsletter:</strong>
              </p>
            </MDBCol>

            <MDBCol md='5' size='12' className='mb-4 mb-md-0'>
              <MDBInput type='text' id='form5Example2' label='Email address'value = {email_footer} onChange = {assignEmail_footer} />
            </MDBCol>

            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <MDBBtn onClick = {submitData_footer}>Subscribe</MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
         
          
          
        </div>
       
  
    </section>
    
  </div>
            <div
                 className="text-center p-3"
                 style={{backgroundColor: "rgba(0,0, 0, 0.2)"}}
                 >
              © 2022-23! 
              <a className="text-white" href="#"
                 > &nbsp; All Rights are Reserved.</a
                >
            </div>
          
          </MDBFooter>
         
        </div>
        
    )
};


export default Footer;
