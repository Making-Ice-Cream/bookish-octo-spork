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
    borderColor:"#FFB2A6"
  };

export default function TryCard() {
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  }
  function handleClick() {
    setLoading(true);
    setOpen(true);
  }
  
  return (
    <div  >
      <Stack spacing={2} >
        <Item style ={{backgroundColor: "#DFF6FF"}} > 
            <LoadingButton
                onClick={handleClick}
                loading={loading}
                variant="contained"
                color = "primary"
                style = {{fontSize : '80'}}
                endIcon={<SendIcon />}
            >
                Fetch data of Batch 2018
            </LoadingButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Stack direction="row">
                    <Typography mb={4} variant="h4" color = "secondary" >Pending Dues of Batch 2018</Typography>
                    <Button  style = {{position:"absolute" , top : '0' , right: '0' , borderRadius : "50%" }}><CancelIcon onClick = {handleClose} style={{fontSize : "2rem"}} /></Button>
                    </Stack>
                    <EnhancedTable />
                    <LoadingButton
                       style = {{marginTop : "20px"}}
                            color="secondary"
                            onClick={handleClick}
                            // loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Save
                    </LoadingButton>
                </Box>
            </Modal>
        </Item>
        <Item style = {{backgroundColor : "#EEEEEE"}}> 
            <LoadingButton
                onClick={handleClick}
                loading={loading}
                variant="contained"
                endIcon={<SendIcon />}
            >
        Fetch data of Batch 2019
            </LoadingButton>
        </Item>
        <Item style = {{backgroundColor : "#D2EBE9"}}> 
            <LoadingButton
                    onClick={handleClick}
                    loading={loading}
                    variant="contained"
                    endIcon={<SendIcon />}
                >
        Fetch data of Batch 2020
      </LoadingButton>
      </Item>
        <Item style = {{backgroundColor : "#FFEFCF"}}> 
            <LoadingButton
                    onClick={handleClick}
                    loading={loading}
                    // loadingIndicator="Loading.. "
                    variant="contained"
                    endIcon={<SendIcon />}
                >
       Fetch data of Batch 2021
             </LoadingButton>
        </Item>
        
      </Stack>
      {/* {console.log("Hello")} */}
      {/* <Grid container spacing ={3} align = "right">
          <StudentList products={PRODUCTS} />
        </Grid> */}

    </div>
  );
}
