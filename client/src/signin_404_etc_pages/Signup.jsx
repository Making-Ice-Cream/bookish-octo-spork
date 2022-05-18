import React , {useState , useEffect} from 'react';
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
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import RegisterImg from "../images/registerImg.svg"
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import {loadModels,
    isFaceDetectionModelLoaded,
    isFacialLandmarkDetectionModelLoaded,
    isFeatureExtractionModelLoaded} from "./loadingmodelsWhenSignup"

import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
// import {useNavigate} from 'react-router-dom'

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 70px;
  border-color: red;
`;

export default function Signup() {
    // const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);

    const [sendbutton , setsendbutton]  = useState(false);
    const [userdata , setuserdata] = useState({
        parentName : "",
        password :"",
        plotNo: "",
        city:"",
        state:"",
        pincode:"",
        country:""


    })
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000000");

    const [imagename ,setimagename] = useState({
        image1 :"",
        image2: "",
        image3: ""
    })

    const [imagedesc , setimagedesc] = useState({
        image1 :"",
        image2: "",
        image3: ""
    })

    const [token , settoken] = useState("");

    const [data , setdata] = useState({
        name :"",
        batch:"",
        paymentType:"",
        email:""
    })
    let navigate = useNavigate();
    
    const goback = () =>{
        
        navigate(-1);
    }

    const makedesc = async(e) =>{
        const [file] = e.target.files;
    
        console.log(file.name);
       let input_name = e.target.name ;
       let value = e.target.value ;
        setimagename({
              ...imagename,
              [input_name] : value
        })

    const referenceImage = await canvas.default.loadImage(URL.createObjectURL(file));

    

    const detectionsWithLandmarks = await faceapi.detectAllFaces(referenceImage).withFaceLandmarks().withFaceDescriptors()

    
    let desc1 = detectionsWithLandmarks[0].descriptor.toString();
    console.log(desc1);
    console.log(input_name)
    
    setimagedesc({
        ...imagedesc , 
        [input_name] : desc1});

    console.log(imagedesc);

    

    }

    const getData = async(e)=>{
        e.preventDefault() ;
         
        const res =  await fetch(`http://localhost:80/student/fetchData`,{
            method : "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
             scholarNumber : `${token}`
            })
        })
        const data = await res.json();
        let obj = {
            name : data.name,
            batch: data.batch,
            paymentType:  data.paymentType,
           email:  data.email
        }
    
        setdata(obj);
         
        setsendbutton(true);

    }

    const changingScholarNumber = (e)=>{
          settoken(e.target.value);
    }
    useEffect(() => {
        async function loadingtheModel() {
          await loadModels();
          setLoading(false);
        }
        if (
          !!isFaceDetectionModelLoaded() &&
          !!isFacialLandmarkDetectionModelLoaded() &&
          !!isFeatureExtractionModelLoaded()
        ) {
            setLoading(false);
          return;
        }
        loadingtheModel();
      }, []);

      const writingData = (e) =>{
            let input_name = e.target.name;
            let val = e.target.value;

            setuserdata({...userdata , [input_name]: val});
      }

      const savedata = async(e) =>{
        e.preventDefault() ;
         
        const res =  await fetch(`http://localhost:80/student/signUp`,{
            method : "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
             scholarNumber : `${token}`,
             password :`${userdata.password}`,
             parent_name : `${userdata.parentName}`,
             plotno : `${userdata.plotNo}`,
             city : `${userdata.city}`,
             state : `${userdata.state}`,
             country : `${userdata.country}`,
             zipcode : `${userdata.pincode}`,
             descriptor1: `${imagedesc.image1}` ,
             descriptor2: `${imagedesc.image2}`,
             descriptor3: `${imagedesc.image3}`
             
            })
        })
        const data = await res.json();

        if(data.status===200){
            alert("Your details saved Successfully, You can login Now!");
            navigate("/" , {replace:true});
        }
        else if(data.status===404){
            alert(data.message);

        }
        else{
            navigate("/500" , {replace : true});
        }
      }
    
    return (
       <div>
       {  !loading ? <div className='whole-cont'>
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
                                            <MDBInput disabled id='name' label='Name'
                                            value = {data.name} />
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput  id='form6Example6' label='Parent name'
                                        name = "parentName"
                                        value = {userdata.parentName}
                                        onChange = {writingData} />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                    <MDBInput disabled id='form6Example1' className='my-2' label='Email'  type='email' value = {data.email} />
                                    </MDBCol>
                                        <MDBCol>
                                        <MDBInput label='Password' className='my-2' id='typePassword' type='password'
                                        name = "password"
                                        value = {userdata.password}
                                        onChange = {writingData} />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className='mb-4'>
                                        <MDBCol>
                                            <MDBInput  id='Scholar_Number' label='Scholar Number' 
                                            name = "scholarNumber"
                                            value= {token}
                                            onChange = {changingScholarNumber}  />
                                        </MDBCol>
                                        <MDBCol>
                                        <MDBInput id='plot_no' label='Plot No.'
                                        name = "plotNo"
                                        value = {userdata.plotNo}
                                        onChange = {writingData} />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput id='cityLabel' label='City'
                                            name = "city"
                                            value = {userdata.city}
                                            onChange = {writingData} />
                                        </MDBCol>
                                        <MDBCol>
                                        <select name="state" id="state" className="form-control"
                                        
                                        value = {userdata.state}
                                        onChange = {writingData}>
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
                                        <MDBInput id='zip_code' label='Zip Code'
                                        name = "pincode"
                                        value = {userdata.pincode}
                                        onChange = {writingData} />
                                    </MDBCol>
                                    <MDBCol>
                                    <MDBInput id='country' label='Country'
                                    name = "country"
                                    value = {userdata.country}
                                    onChange = {writingData} />
                                    </MDBCol>
                                </MDBRow>


                                    <MDBRow className='mb-4'>

                                    < MDBCol>
                                   

                              <MDBInput id='batch' label="Batch"  value={data.batch}/>
                                    </MDBCol>
                                    <MDBCol>
                                    


                                        <MDBInput id='payment_type' label="Payment Type" value={data.paymentType}/>
                                    </MDBCol>


                                </MDBRow>

                                <MDBRow className='mb-4'>

                                    <div className='file-container' >
                                        <MDBFile label='Attach Your 3 different photos' id='customFile1' name = "image1"
                                        value = {imagename.image1} 
                                        onChange = {makedesc}/>

                                        <MDBFile label='' id='customFile2' name = "image2"
                                        value = {imagename.image2} 
                                        onChange = {makedesc}/>



                                        <MDBFile label='' id='customFile3'
                                        name = "image3"
                                        value = {imagename.image3} 
                                        onChange = {makedesc} />
                                    </div>


                                </MDBRow>

                                <MDBCheckbox
                                        wrapperClass='d-flex justify-content-center mb-2'
                                        id='form6Example8'
                                        label='I have read all the terms and condition'
                                        defaultChecked
                                    />
                                     <MDBBtn color='secondary' className='m-4' rounded type='submit'
                                     disabled= {sendbutton} onClick = {getData} >
                                        Fetch Data
                                    </MDBBtn>
                                    <MDBBtn disabled = {!sendbutton} className='mb-4' rounded type='submit' onClick = {savedata}>
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
                  </div>:<div className="sweet-loading" style={{display:'flex',justifyContent: 'center', alignItems :'center'}}>
                      <h3 style={{display:'block'}}>Loading Models. Please Wait</h3>
                    <DotLoader color={color} loading={loading} css={override} size={150} />
             </div>}
        </div>

    );
}