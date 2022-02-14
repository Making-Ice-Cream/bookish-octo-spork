import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBFile,
    MDBContainer
} from 'mdb-react-ui-kit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "../AllCSS/Signup.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RegisterImg from "../images/registerImg.svg"
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";

// import {useNavigate} from 'react-router-dom'
export default function Signup() {
    const [age, setAge] = React.useState('');
    let navigate = useNavigate();
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const goback = () =>{
        
        navigate(-1);
    }
    return (
       <div>
        <div className='whole-cont'>
            <div className="icon" onClick={goback}><Tooltip title = "Go Back" ><ArrowBackIosIcon  color="secondary" /></Tooltip></div>
            <MDBRow >
        
                    <MDBCol size='6' className='col-example1'>
                    <div className=" my-2 " >
                                <div className=".wrapper-signup">
                                    <div className="cont">
                                        <h2 className='h1-signup text-center'>Signup for Students</h2>
                                    </div>
                                </div>
                                
                                <form  className = "my-3 container form-signup" >

                                    <MDBRow className='mb-4'>
                                        <MDBCol>
                                            <MDBInput disabled id='form6Example1' label='First name' />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput disabled id='form6Example2' label='Last name' />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                    <MDBInput disabled id='form6Example1' className='my-2' label='Email'  type='email' />
                                    </MDBCol>
                                        <MDBCol>
                                        <MDBInput label='Password' className='my-2' id='typePassword' type='password' />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className='mb-4'>
                                        <MDBCol>
                                            <MDBInput focussed id='form6Example1' label='Matrix Id' />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput id='form6Example2' label='City' />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput id='form6Example2' label='State' />
                                        </MDBCol>
                                    </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput id='form6Example1' label='Zip Code' />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput id='form6Example2' label='Country' />
                                    </MDBCol>

                                </MDBRow>


                                    <MDBRow className='mb-4'>

                                    < MDBCol>
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Payment Type"
                                            onChange={handleChange}
                                            style = {{padding:"-1px"}}
                                            >
                                            <MenuItem value={10}>IIT-JEE</MenuItem>
                                            <MenuItem value={20}>JEE-MAINS</MenuItem>
                                            <MenuItem value={30}>NEET</MenuItem>
                                            <MenuItem value={40}>Foundation</MenuItem>
                                        
                                            
                                            </Select>
                                        </FormControl>
                                    </MDBCol>
                                    <MDBCol>
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Payment Type"
                                            onChange={handleChange}
                                            style = {{padding:"-1px"}}
                                            >
                                            <MenuItem value={10}>Lump Sum</MenuItem>
                                            <MenuItem value={20}>Installments</MenuItem>
                                            
                                            </Select>
                                        </FormControl>
                                    </MDBCol>


                                </MDBRow>

                                <MDBRow className='mb-4'>

                                    <div className='file-container' >
                                        <MDBFile label='Attach Your 2 different photos' id='customFile' />
                                    <MDBFile label='' id='customFile' />
                                    </div>


                                </MDBRow>

                                <MDBCheckbox
                                        wrapperClass='d-flex justify-content-center mb-2'
                                        id='form6Example8'
                                        label='I have read all the terms and condition'
                                        defaultChecked
                                    />

                                    <MDBBtn className='mb-4' type='submit' >
                                        SignUp
                                    </MDBBtn>
                                </form>
                                
                            </div>
                    </MDBCol>
                    <MDBCol size='6' className='col-example '>
                        <div className="image">
                            <img src={RegisterImg} />
                        </div>
                    </MDBCol>
            </MDBRow>
        </div>

        </div>

    );
}