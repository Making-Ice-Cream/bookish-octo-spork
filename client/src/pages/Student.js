import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import  React , {useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import SendIcon from '@mui/icons-material/Send';


import '../AllCSS/Add_task.css';
// import SendIcon from '@mui/icons-material/Send';
import PRODUCTS from '../_mocks_/products';
import { ProductFilterSidebar , ProductSort} from "../components/_dashboard/products"



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

// ----------------------------------------------------------------------



export default function Student() {
  const navigate = useNavigate();
  // const handleOpen = ()=>{
  //   navigate("/admin/new/student")
  // }
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

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
            to="/admin/new/student"
            // data = {"student"}
            // onClick={handleOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            New Student
          </Button>
          
        </Stack>
       
        

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/* <TextField  id="outlined-basic" label="Outlined"  size="small" /> */}
          <TextField
             id="filled-hidden-label-small"
              label="Student Scholar Number"
            
               size="small"
            sx={{
              width: '30ch',
            }}
          />
          <Button align=  "right" variant="contained" endIcon={<SendIcon />}>
            Check
          </Button>
          <ProductFilterSidebar formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}/>
          {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
          <ProductSort />
        </Stack>

        <Grid container spacing={3}>
          <StudentList products={PRODUCTS} />
        </Grid>
      </Container>
    </Page>
  );
}
