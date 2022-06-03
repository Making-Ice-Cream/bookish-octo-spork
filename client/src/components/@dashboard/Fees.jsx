
import React , {useEffect, useState} from 'react'
import Page from '../Page';
import {Container, Stack , Typography , Button , Box , TextField } from '@mui/material';
import Iconify from '../Iconify';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fees = () => {
  const [data , setdata] = useState({
    paymentType:"Lump Sum",
    feeStatus:"Not paid",
    delay:"152221",
    amountDue: 12535,
    message : ""
  })

  const [backgroundColor , setbackgroundColor] = useState();

  useEffect(async()=>{
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
  setdata(awaited_response);

  if(awaited_response.amountDue == 0){
    setbackgroundColor("#d9b3ff");
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
    setbackgroundColor('ffc266');
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
  },[])
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
                      backgroundColor: {backgroundColor},
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  noValidate
                  autoComplete="off"
              >
                <Stack>
               
              <TextField
                error = {data.amountDue != 0 ? true : false}
                varient = "standard"
                id="outlined-read-only-input"
                label="Payment Type"
                defaultValue={data.paymentType}
                 InputProps={{
                        readOnly: true,
                }}
              />
              <TextField
                error = {data.amountDue != 0 ? true : false}
                id="standard-error-helper-text"
                label="Fee Status"
               
                defaultValue={data.feeStatus}
                InputProps={{
                       readOnly: true,
                }}
                variant="standard"
              />
               
               </Stack>
               <Stack>

                
                <TextField
                  error = {data.amountDue != 0 ? true : false}
                  id="standard-error"
                  label="Due Amount"
                  defaultValue={"₹  " + data.amountDue}
                  variant="standard"
                  
                  InputProps={{
                          readOnly: true,
                  }}
                />
                <TextField
                  error = {data.amountDue != 0 ? true : false}
                  id="standard-error-helper-text"
                  label="Delay"
                  defaultValue= {Math.floor(data.delay / (3600*24)) + " day "}
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