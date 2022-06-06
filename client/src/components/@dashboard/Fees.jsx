
import React , {useEffect, useState} from 'react'
import Page from '../Page';
import {Container, Stack , Typography , Button , Box , TextField } from '@mui/material';
import Iconify from '../Iconify';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fees = () => {
  const [data , setdata] = useState(null);

  // if(localStorage.getItem("feeStatus") != null){
  //   setdata(JSON.parse(localStorage.getItem("feeStatus")));
  // }
  // alert(data != null ? data.paymentType + "  " + data.delay : "empty");
  console.log(data);
  

  // const [backgroundColor , setbackgroundColor] = useState();
  
  async function gettingData (){
    const response =  await fetch("http://localhost:80/student/feeStatus",{
      method : "POST",
      headers :{
          "Accept":"application/json",
          "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        token:Cookies.get('token')
      })
  });
  const awaited_response = await response.json();
  // let obj = {
  //       paymentType: awaited_response.paymentType,
  //       feeStatus:awaited_response.feeStatus,
  //       delay:awaited_response.delay,
  //       amountDue: awaited_response.amountDue
  //  }
   setdata(awaited_response);
  // console.log(obj);
   console.log(data);
   localStorage.setItem("feeStatus" , JSON.stringify(awaited_response));
  if(awaited_response.amountDue == 0){
    // setbackgroundColor("");
    toast.success("Your Fees is not due!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
      });
  }
  else{
    // setbackgroundColor('#ffc266');
    toast.error("Your Fees is due!", {
      theme: "colored",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
 }

  

  useEffect(()=>{
      gettingData();
  }, []);
  return (
    <Page title="Student | Fee-Status">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Fee Status
          </Typography>
          <Button
            variant="contained"
            // component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Query
          </Button>
        </Stack>
              <Box 
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 3, width: '35ch' },
                    width:  '100%',
                    height: 400,
                    backgroundColor: "#F0F0F0",
                    display :'flex',
                    justifyContent : 'center',
                    alignItems :'center',
                    '&:hover': {
                      backgroundColor: "#d9b3ff",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  noValidate
                  autoComplete="off"
              >
                <Stack>
               
              <TextField
                // disabled = {true}
                error = {data != null && data.amountDue != 0 ? true : false}
                
                id="standard-error"
                label="Payment Type"
                focused= {true}
                value={data != null  ? data.paymentType : " "}
                varient = "standard"
                 InputProps={{
                        readOnly: true,
                }}
                
              />
              <TextField
                // disabled = {true}
                error = {data != undefined && data.amountDue != 0 ? true : false}
                id="standard-error-helper-text"
                label="Fee Status"
                 focused= {true}
                value={data != undefined  ? data.feeStatus : " "}
                InputProps={{
                       readOnly: true,
                }}
                variant="standard"
              />
               
               </Stack>
               <Stack>

                
                <TextField
                  error = {data != null && data.amountDue != 0 ? true : false}
                  id="standard-error"
                  label="Due Amount"
                  value={"₹  " + (data != null ? data.amountDue : 0)}
                  variant="standard"
                  // value = {data.amountDue}
                  InputProps={{
                          readOnly: true,
                  }}
                />
                <TextField
                  error = {data != undefined && data.amountDue != 0 ? true : false}
                  id="standard-error-helper-text"
                  label="Delay"
                  value= {Math.floor((data != null   ? data.delay : 0) / (3600*24)) + " day "}
                 InputProps={{
                        readOnly: true,
                 }}
                  variant="standard"
                />
               
               </Stack>
              </Box>
      </Container>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
       />
    
    </Page>

  )
}

export default Fees