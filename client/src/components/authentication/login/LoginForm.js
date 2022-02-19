import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// import { Icon } from '@iconify/react';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import "../../../AllCSS/textColor.css"
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// material
import { 
  Stack,
  MenuItem, 
  FormControl,
  InputLabel, 
  Select,
  TextField,
  
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
let d ;

export default function LoginForm() {
  
  function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   i += 1;
   }
   
   return result ;
  }
  useEffect(() => {
  d =   makeid(29);
 
  }, [])

  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First Name is required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last Name is required'),
    contact: Yup.string().required('Mobile Number is required'),
     parent_contact: Yup.string().required('Mobile Number is required'),
    batch:Yup.string().required("Batch is Required"),
    paymentType: Yup.string().required("Payment Type is Required")
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email:'',
      contact:'',
      parent_contact:'',
      batch:'',
      paymentType:''
    },
    validationSchema: RegisterSchema,
    onSubmit:async(values) => {
      // console.log(values)
       let { email, firstName, lastName,  contact, parent_contact,paymentType,batch,} = values;
       

       const response =  await fetch(`http://localhost:80/admin/student/newstudent`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email,firstName, lastName,  contact, parent_contact,paymentType,batch,scholarNumber : `${d}`
        })
    });
    const awaited_response = await response.json();
    if(awaited_response.status === 201){
      alert("Addition Successful, Now Redirecting to Home Page!")
        navigate("/admin/Student",{replace:true})
    }else{
      naviagte("/500",{replace:true});
    }

    }
  });
  

  const { errors, touched,  isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Stack spacing={3} direction = "row">
              <TextField fullWidth type= "text" label="First Name"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                
                />
                <TextField fullWidth
                  type="text"
                  label="Last Name"
                  {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}

                />

                </Stack>
               <Stack mt={4}>
                      <TextField  label="Mobile Number"
                      type = "number"
                      {...getFieldProps('contact')}
                      error={Boolean(touched.contact && errors.contact)}
                      helperText={touched.contact && errors.contact}
                      />
                </Stack>
                <Stack mt={4}  >
                 <TextField  label="Parent Mobile Number"
                type = "number"
                {...getFieldProps('parent_contact')}
                error={Boolean(touched.parent_contact && errors.parent_contact)}
                helperText={touched.parent_contact && errors.parent_contact}
                />
              </Stack>

              <Stack mt={4}  >
                <TextField  label="Email"
                type = "email" 
                
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                />
                </Stack>
                <Stack mt={3}  >
                {/* {console.log(d)} */}
                 <TextField disabled label="Scholar Number"
                type = "text"
                value = {typeof d === 'undefined' ? "generating ID" : d}
               
                />
              </Stack>

              <Stack mt={4} direction = "row" spacing = {6} >
              <FormControl fullWidth>
                                              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                              <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              // value={age}
                                              label="Payment Type"
                                              defaultValue=''
                                              // onChange={handleChange}
                                              style = {{padding:"-1px"}}

                                              {...getFieldProps('batch')}
                                              error={Boolean(touched.batch && errors.batch)}
                                              helpertext={touched.batch && errors.batch}
                                              >
                                              <MenuItem value={"IIT-JEE"}>IIT-JEE</MenuItem>
                                              <MenuItem value={"JEE-MAINS"}>JEE-MAINS</MenuItem>
                                              <MenuItem value={"NEET"}>NEET</MenuItem>
                                              <MenuItem value={"Foundation"}>Foundation</MenuItem>
                                          
                                              
                                              </Select>
                                          </FormControl>
                                          <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            
                                            // value={age}
                                            label="Payment Type"
                                            {...getFieldProps('paymentType')}
                                            error={Boolean(touched.paymentType && errors.paymentType)}
                                            helpertext={touched.paymentType && errors.paymentType}
                                            // onChange={handleChange}
                                            style = {{padding:"-1px"}}
                                            >
                                            <MenuItem value={"Lump Sum"}>Lump Sum</MenuItem>
                                            <MenuItem value={"Installments"}>Installments</MenuItem>
                                            
                                            </Select>
                                        </FormControl>
              </Stack>


        <LoadingButton
          className = "mt-4"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
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
    </FormikProvider>
  );
}
