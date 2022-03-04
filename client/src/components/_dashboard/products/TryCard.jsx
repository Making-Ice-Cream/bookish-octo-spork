import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EnhancedTable from "./EnhancedTable"
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Grid from '@mui/material/Grid';
import PRODUCTS from '../../../_mocks_/products';
import { CSVLink, CSVDownload } from "react-csv";
import fetch from 'sync-fetch';
import Cookies from 'js-cookie';
import {

  StudentList,

} from '../students';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 890,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:"19px",
    borderColor:"#FFB2A6",
    height:580
  };
let fetch_data = [];

export default function TryCard() {
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState({
      "IIT_JEE" : false ,
      "JEE_MAINS" : false,
      "NEET" : false,
      "Foundation" : false
    });
  const handleOpen = (e) => {
    setOpen(true);
  }
  const handleClose = (e) => {
    // console.log(e)
    console.log(e.parent)
    console.log(e.target.id)
    // console.log("id" + e.target.id)
    // console.log("name" + e.target.name)
    // console.log(e.target.name)
    setOpen({
      ...open ,[e.target.id]:false})
      console.log(open)
    setLoading(false);
  }
  function handleClick(e) {
    setLoading(true);
    let name = e.target.name ;
    console.log(name)
    setOpen({
      ...open ,[name]:true})

    //  console.log(open);
    fetch_data = getData(e.target.name);
    // setOpen(true);
  }

  const getData =  (batch) =>{
    if(batch === "JEE_MAINS") batch = "JEE-MAINS"
    else if(batch === "IIT_JEE") batch = "IIT-JEE"
    else if(batch === "NEET") batch = "NEET"
    else if(batch === "Foundation") batch = "Foundation"
    console.log(Cookies.get('token'));
    const metadata = fetch('http://localhost:80/admin/pendingDues', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.citationstyles.csl+json',
          token : Cookies.get('token'),
          batch
        }
    }).json()
    console.log(metadata)
   return metadata.studentsPendingFee;

  }
  
  return (
    <div  >
      {console.log(open.IIT_JEE)}
      <Stack spacing={2} >
        <Item style ={{backgroundColor: "#DFF6FF"}} > 
            <LoadingButton
                name = {"IIT_JEE".toString()} 
                onClick={handleClick}
                loading={loading}
                variant="contained"
                color = "primary"
              
                endIcon={<SendIcon />}
            >
                Fetch data of  IIT-JEE Batch
            </LoadingButton>
            {/* {console.log(open.IIT_JEE)} */}
            <Modal

                open={open.IIT_JEE}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-jee"
                aria-describedby="modal-modal-description-jee"
                >
                <Box sx={style}>
                    <Stack direction="row">
                    <Typography id = "modal-modal-title-jee" mb={4} variant="h4" color = "secondary" >Pending Dues of IIT-JEE Batch</Typography>

                    <Button 
                    
                     style = {{position:"absolute" , top : '0' , right: '0' , borderRadius : "50%" }}
                    
                    ><CancelIcon  
                    id = "IIT_JEE"
                   
                    onClick = {handleClose} style={{fontSize : "2rem"}} /></Button>
                    
                    </Stack>
                    {/* {console.log(fetch_data)} */}
                    <EnhancedTable data = {[ fetch_data, "IIT-JEE-" + new Date().toLocaleTimeString()]}/>
                    
                </Box>
            </Modal>
        </Item>
        <Item style = {{backgroundColor : "#EEEEEE"}}> 
            <LoadingButton
             name = {"JEE_MAINS".toString()} 
                onClick={handleClick}
                loading={loading}
                variant="contained"
                endIcon={<SendIcon />}
            >
        Fetch data of JEE-MAINS Batch 
            </LoadingButton>
            <Modal
                open={open.JEE_MAINS}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-main"
                aria-describedby="modal-modal-description-main"
                >
                <Box sx={style}>
                    <Stack direction="row">
                    <Typography id="modal-modal-title-main" mb={4} variant="h4" color = "secondary" >Pending Dues of JEE-MAINS Batch</Typography>

                    <Button id = "modal-modal-description-main" style = {{position:"absolute" , top : '0' , right: '0' , borderRadius : "50%" }}>
                      <CancelIcon id = "JEE_MAINS" onClick = {handleClose} style={{fontSize : "2rem"}} /></Button>
                    </Stack>
                    {/* {console.log(fetch_data)} */}
                    <EnhancedTable data = {[ fetch_data, "JEE-MAINS-" +new Date().toLocaleTimeString()]}/>
                    
                </Box>
            </Modal>
        </Item>
        <Item style = {{backgroundColor : "#D2EBE9"}}> 
            <LoadingButton
                   name = {"NEET".toString()} 
                    onClick={handleClick}
                    loading={loading}
                    variant="contained"
                    endIcon={<SendIcon />}
                >
        Fetch data of NEET Batch
      </LoadingButton>
      <Modal
                open={open.NEET}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-neet"
                aria-describedby="modal-modal-description-neet"
                >
                <Box sx={style}>
                    <Stack direction="row">
                    <Typography id = "modal-modal-title-neet" mb={4} variant="h4" color = "secondary" >Pending Dues of NEET Batch </Typography>
                    <Button id = "modal-modal-description-neet" style = {{position:"absolute" , top : '0' , right: '0' , borderRadius : "50%" }}>
                      <CancelIcon id = "NEET" onClick = {handleClose} style={{fontSize : "2rem"}} /></Button>
                    </Stack>
                    {/* {console.log(fetch_data)}  */}
                    <EnhancedTable data = {[ fetch_data, "NEET-" +new Date().toLocaleTimeString()]}/>
                    
                </Box>
            </Modal>
      </Item> 
        <Item style = {{backgroundColor : "#FFEFCF"}}> 
            <LoadingButton
                   name = {"Foundation".toString()} 
                    onClick={handleClick}
                    loading={loading}
                    // loadingIndicator="Loading.. "
                    variant="contained"
                    endIcon={<SendIcon  />}
                >
       Fetch data of Foundation Batch
             </LoadingButton>
             <Modal
                open={open.Foundation}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-foundation"
                aria-describedby="modal-modal-description-foundation"
                >
                <Box sx={style}>
                    <Stack direction="row">
                    <Typography id = "modal-modal-title-foundation" mb={4} variant="h4" color = "secondary" >Pending Dues of Foundation Batch</Typography>
                    <Button id = "modal-modal-description-foundation" style = {{position:"absolute" , top : '0' , right: '0' , borderRadius : "50%" }}>
                      <CancelIcon id = "Foundation" onClick = {handleClose} style={{fontSize : "2rem"}} /></Button>
                    </Stack>
                     {/* {console.log(fetch_data)}  */}
                     <EnhancedTable data = {[ fetch_data, "Foundation-"  +new Date().toLocaleTimeString()]}/>
                    
                </Box>
            </Modal>
        </Item>   
        
      </Stack>
      {/* {console.log("Hello")} */}
      {/* <Grid container spacing ={3} align = "right">
          <StudentList products={PRODUCTS} />
        </Grid> */}

    </div>
  );
}
