import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBFile
} from 'mdb-react-ui-kit';
import "../AllCSS/Signup.css"
export default function Signup() {
    return (
        <div className="container my-2">
            <div className="wrapper">
                <div className="cont">
                    <h1>signup for Students</h1>
                </div>
            </div>
            
            <form  className = "my-3 container" >

                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput id='form6Example1' label='First name' />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput id='form6Example2' label='Last name' />
                    </MDBCol>
                </MDBRow>

                <MDBRow className='mb-4'>
                    <MDBCol>
                       <MDBInput label='Password' id='typePassword' type='password' />
                    </MDBCol>
                    <MDBCol>
                    <MDBInput label='Re Enter Password' id='typePassword' type='password' />
                    </MDBCol>
                </MDBRow>

                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput id='form6Example1' className='my-2' label='Email'  type='email' />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput id='form6Example2' className='my-2' type='tel' label='Phone' />
                    </MDBCol>

                </MDBRow>

                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput id='form6Example1' label='Plot No.' />
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

                    <div className='file-container' >
                        <MDBFile label='Attach Your 2 different photos' id='customFile' />
                        <MDBFile label='' id='customFile' />
                    </div>


                </MDBRow>

                <MDBCheckbox
                    wrapperClass='d-flex justify-content-center mb-4'
                    id='form6Example8'
                    label='I have read all the terms and condition'
                    defaultChecked
                />

                <MDBBtn className='mb-4' type='submit' >
                    SignUp
                </MDBBtn>
            </form>
            
        </div>

    );
}