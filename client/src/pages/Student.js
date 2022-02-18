import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import  React , {useEffect,useState} from 'react';
import * as Yup from 'yup';

// import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, Button, Container, Stack, Typography, Box, Modal, FormControlLabel, MenuItem, FormControl,InputLabel, Select} from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import "../AllCSS/textColor.css"

import { LoadingButton } from '@mui/lab';
import '../AllCSS/Add_task.css';
// import SendIcon from '@mui/icons-material/Send';
import PRODUCTS from '../_mocks_/products';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';


import {

  StudentList,

} from '../components/_dashboard/students';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'jeeadvance', label: 'IIT JEE' },
  { value: 'neet', label: 'NEET' },
  { value: 'jee mains', label: 'JEE MAINS' },

];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #b0ff57',
  boxShadow: 15,
  p: 4,
  borderRadius:'20px'
};
let d ;
// ----------------------------------------------------------------------
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
 d = result;
}


export default function Student() {
   const[user, setuser] = useState({
     email:'',
     firstname:'',
     lastname:'',
     contact:'',
     parent_contact:'',
     paymenttype:'',
     batch:'',
     scholarNumber:''

   })
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
   d=  makeid(17);
  //  console.log(d);
  }, [])
  
  const changingCredentail = (e)=>{
    let input_name = e.target.name ;
    let  value = e.target.value ;
    setuser({...user , [input_name]:value})
  }

  const submiiting = ()=>{
    alert(user.email + user.batch);
  }
  
  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   firstName: Yup.string().required('First Name is required'),
  //   lastName: Yup.string().required('Last Name is required'),
  //   mobilenumber: Yup.string().required('Mobile Number is required'),
  //   parentmobilenumber: Yup.string().required('Mobile Number is required')
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email:'',
  //     mobilenumber:'',
  //     parentmobilenumber:''
  //   },
  //   validationSchema: LoginSchema,
  //   onSubmit: () => {
  //     navigate('/dashboard', { replace: true });
  //   }
  // });

  // const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="Dashboard: Student">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Students
          </Typography>
          <Button
            className="new-btn"
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            New Student
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            
            <Box sx={style}>
            
            <Tooltip title="Close Modal">
            <CancelIcon className = "close_icon" onClick = {handleClose} />
            </Tooltip>
            <Stack >
              <Typography className = "text_color" variant = "h3"  align = "center" spacing = {3}>ADD NEW STUDENT</Typography>
              </Stack>
              <Stack spacing={6.5} direction = "row">
              <TextField type= "text" label="First Name"
                // {...getFieldProps('firstName')}
                // error={Boolean(touched.firstName && errors.firstName)}
                // helperText={touched.firstName && errors.firstName}
                name = "firstname"
                value = {user.firstname}
                onChange = {changingCredentail}
                />
                <TextField 
                  type="text"
                  label="Last Name"
                  name = "lastname"
                  value = {user.lastname}
                  onChange = {changingCredentail}
                //   {...getFieldProps('lastName')}
                // error={Boolean(touched.lastName && errors.lastName)}
                // helperText={touched.lastName && errors.lastName}

                />

                </Stack>
               <Stack mt={3} direction = "row" spacing = {7} >
                <TextField  label="Mobile Number"
                type = "number"
                name = "contact"
                value = {user.contact}
                onChange = {changingCredentail}
                // {...getFieldProps('mobilenumber')}
                // error={Boolean(touched.mobilenumber && errors.mobilenumber)}
                // helperText={touched.mobilenumber && errors.mobilenumber}
                />
                 <TextField  label="Parent Mobile Number"
                type = "number"
                name = "parent_contact"
                value = {user.parent_contact}
                onChange = {changingCredentail}
                // {...getFieldProps('parentmobilenumber')}
                // error={Boolean(touched.parentmobilenumber && errors.parentmobilenumber)}
                // helperText={touched.parentmobilenumber && errors.parentmobilenumber}
                />
              </Stack>

              <Stack mt={3} direction = "row" spacing = {6.75} >
                <TextField  label="Email"
                type = "email" 
                name = "email"
                value = {user.email}
                onChange = {changingCredentail}
                // {...getFieldProps('email')}
                // error={Boolean(touched.email && errors.email)}
                // helperText={touched.email && errors.email}
                />
                {console.log(d)}
                 <TextField disabled label="Scholar Number"
                type = "text"
                value = {d}
                // value = "Hello"
                />
              </Stack>

              <Stack mt={3} direction = "row" spacing = {6} >
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
                                              name = "batch"
                                              value = {user.batch}
                                              onChange = {changingCredentail}
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
                                            name = "paymenttype"
                                              value = {user.paymenttype}
                                              onChange = {changingCredentail}
                                            // value={age}
                                            label="Payment Type"
                                            // onChange={handleChange}
                                            style = {{padding:"-1px"}}
                                            >
                                            <MenuItem value={"Lump Sum"}>Lump Sum</MenuItem>
                                            <MenuItem value={"Installments"}>Installments</MenuItem>
                                            
                                            </Select>
                                        </FormControl>
              </Stack>

              <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
           style = {{marginTop:"20px"}}
           onClick = {submiiting}
          // loading={isSubmitting}
        >
          Add Student
        </LoadingButton>

            </Box>
          </Modal>
        </Stack>
       
        

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/* <TextField  id="outlined-basic" label="Outlined" variant="Student Name" size="small" /> */}
          <TextField

            id="filled-hidden-label-small"

            label="Search Student"
            size="small"
            sx={{
              width: '30ch',
            }}
          />

          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          <StudentList products={PRODUCTS} />
        </Grid>
      </Container>
    </Page>
  );
}
