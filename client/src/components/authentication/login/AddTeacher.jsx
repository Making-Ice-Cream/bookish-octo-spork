import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography,MenuItem,FormControl,
    InputLabel, 
    Select,
    TextField } from '@mui/material';
// layouts
import AuthLayout from '../../../layouts/AuthLayout';

// components
import Page from '../../Page';
import { MHidden } from '../../@material-extend';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider,Field } from 'formik';
// import AuthSocial from '../components/authentication/AuthSocial';
import "../../../AllCSS/textColor.css"
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function AddTeacher() {
    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
        department: Yup.string().required('Department is required'),
       
        contact: Yup.string().min(9, 'Too Short!').max(11, 'Too Long!').required('Mobile Number is required'),
        role: Yup.string().required('Role is required'),
        

      });
    
      const formik = useFormik({
        initialValues: {
          fullName: '',
          department:'',
          email:'',
          contact:'',
          role:''
         
        },
        validationSchema: RegisterSchema,
        onSubmit:async(values) => {
          // console.log(values)
           
        }
      });
      const { errors, touched,  isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <RootStyle title="Admin | Student | Teacher ">
      <AuthLayout>
        Back to Home? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/admin/app">
          Dashboard
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back 
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom className = "text_color">
            Create a New Teacher
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter the details below.</Typography>
          </Stack>
          
          {/* ----------------------------------- */}
          <FormikProvider value={formik}>
      
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Stack spacing={3} direction = "row">
              <TextField fullWidth type= "text" label="Full Name"
                {...getFieldProps('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                
                />

                </Stack>
               <Stack mt={4} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField  label="Department"
                            type = "text"
                            {...getFieldProps('department')}
                            error={Boolean(touched.department && errors.department)}
                            helperText={touched.department && errors.department}
                      />
                      <TextField  label="Role"
                            type = "text"
                            {...getFieldProps('role')}
                            error={Boolean(touched.role && errors.role)}
                            helperText={touched.role && errors.role}
                      />
                </Stack>
               

              <Stack mt={4} direction={{ xs: 'column', sm: 'row' }} spacing={2} >
                <TextField  label="Email"
                type = "email" 
                
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                />
               
    
                 <TextField  label="Phone Number"
                type = "number"
                {...getFieldProps('contact')}
                error={Boolean(touched.contact && errors.contact)}
                helperText={touched.contact && errors.contact}
               
                />
              </Stack>
              <Stack mt={4}  >
              <TextField label="Profile Picture"
                focused
                type = "file"
                // {...getFieldProps('contact')}
                // error={Boolean(touched.contact && errors.contact)}
                // helperText={touched.contact && errors.contact}
                />
              </Stack>

              <Stack mt={4} direction = "row" spacing = {6} >
              <FormControl fullWidth>
                                              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                              <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                        
                                              label="Gender"
                                              defaultValue=''
                                             
                                              style = {{padding:"-1px"}}

                                              {...getFieldProps('batch')}
                                              error={Boolean(touched.batch && errors.batch)}
                                              helpertext={touched.batch && errors.batch}
                                              >
                                              <MenuItem value={"Male"}>Male</MenuItem>
                                              <MenuItem value={"Female"}>Female</MenuItem>
                                              
                                          
                                              
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
          Add Teacher
        </LoadingButton>
      </Form>
      
    </FormikProvider>

         {/* ------------------------------------- */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

