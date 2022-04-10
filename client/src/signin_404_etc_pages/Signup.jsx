import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBFile,
    // MDBContainer
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
                                            <MDBInput disabled id='name' label='Name' />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput  id='form6Example6' label='Parent name' />
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
                                            <MDBInput  id='Scholar_Number' label='Scholar Number' />
                                        </MDBCol>
                                        <MDBCol>
                                        <MDBInput id='plot_no' label='Plot No.' />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput id='cityLabel' label='City' />
                                        </MDBCol>
                                        <MDBCol>
                                        <select name="state" id="state" className="form-control">
                                            <option value="No Value">State</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                            </select>
                                            
                                        </MDBCol>
                                    </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput id='zip_code' label='Zip Code' />
                                    </MDBCol>
                                    <MDBCol>
                                    <MDBInput id='country' label='Country' />
                                    </MDBCol>
                                </MDBRow>


                                    <MDBRow className='mb-4'>

                                    < MDBCol>
                                    <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                            <Select disabled
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
                                            <Select disabled
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
                                        <MDBFile label='Attach Your 2 different photos' id='customFile1' />
                                    <MDBFile label='' id='customFile2' />
                                    </div>


                                </MDBRow>

                                <MDBCheckbox
                                        wrapperClass='d-flex justify-content-center mb-2'
                                        id='form6Example8'
                                        label='I have read all the terms and condition'
                                        defaultChecked
                                    />
                                     <MDBBtn color='secondary' className='m-4' rounded type='submit' >
                                        Fetch Data
                                    </MDBBtn>
                                    <MDBBtn disabled className='mb-4' rounded type='submit' >
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