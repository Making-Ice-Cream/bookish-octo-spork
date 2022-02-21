import React , {useState} from 'react'
import { Link as RouterLink,useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography,MenuItem,FormControl,
    InputLabel, 
    Select,
    TextField,IconButton, InputAdornment } from '@mui/material';
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
import { Icon } from '@iconify/react';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
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
  const navigate = useNavigate();
  const [url ,seturl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const uploadImage = async(e)=>{
    const files = e.target.files;
    const data = new FormData();
    data.append('file',files[0]);
    data.append('upload_preset','teacher_image');

    const res = await fetch("https://api.cloudinary.com/v1_1/apni-coaching/image/upload",{
      method:"POST",
      body:data
    })
    const file = await res.json();
    seturl(file.secure_url);
    console.log(file.secure_url)
    console.log(url);
  }

    

    const RegisterTeacherSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
        batch: Yup.string().required('Batch is required'),
        subject: Yup.string().required('Subject is required'),
        gender: Yup.string().required('Gender is required'),
        contact: Yup.string().min(9, 'Too Short!').max(11, 'Too Long!').required('Mobile Number is required'),
        password: Yup.string().required('Password is required')
        

      });
    
      const formik = useFormik({
        initialValues: {
          fullName: '',
          batch:'',
          email:'',
          contact:'',
          password:'',
          gender:'',
          subject:''
         
        },
        validationSchema: RegisterTeacherSchema,
        onSubmit: async(values) => {
        
          let {fullName , batch , email , contact , gender ,subject , password} = values;
           
          const response =  await fetch(`http://localhost:80/admin/faculty/newfaculty`,{
            method : "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              fullName , batch , email , contact , gender ,subject , password , imageUrl : url 
            })
        });
        const awaited_response = await response.json();
        if(awaited_response.status === 201){
          alert("Faculty Addition Successfully, Now Redirecting to Home Page!");
          navigate("/admin/app" , {replace:true});
        }
        else{
          alert("An Error Occurred!");
          naviagte("/500" ,{replace:true});
        }
           
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
            Add a New Teacher
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
                      <TextField  label="Batch"
                            type = "text"
                            {...getFieldProps('batch')}
                            error={Boolean(touched.batch && errors.batch)}
                            helperText={touched.batch && errors.batch}
                      />
                      <TextField  label="Subject"
                            type = "text"
                            {...getFieldProps('subject')}
                            error={Boolean(touched.subject && errors.subject)}
                            helperText={touched.subject && errors.subject}
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
              <Stack mt={4}>
              <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

              </Stack>
              <Stack mt={4}  >
              <TextField label="Profile Picture"
                focused
                name = "file"
                type = "file"
                onChange={uploadImage}
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

                                              {...getFieldProps('gender')}
                                              error={Boolean(touched.gender && errors.gender)}
                                              helpertext={touched.gender && errors.gender}
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

