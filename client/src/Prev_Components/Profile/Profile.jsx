import React , {useState} from 'react'
import "./Profile.css"
import "./Profiles.js" 
import {TextField } from '@mui/material';
import deepak from "../../images/deepak2.jpeg"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
    const[user , setuser] = useState({
      name: JSON.parse(localStorage.getItem('name')),
      email:  JSON.parse(localStorage.getItem('user_email'))
    })

    const sendData = async(e) =>{
      const {name, email} = user ;
      e.preventDefault() ;
      const response =  await fetch(`http://localhost:80/admin/SaveChangesToProfile`,{
        method : "POST",
        headers :{
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email,name 
        })
    });
    const awaited_response = await response.json();
    if(awaited_response.status === 200){
      alert("Profile Updated!");
      localStorage.setItem("name" , JSON.stringify(user.name));
      localStorage.setItem("email" , JSON.stringify(user.email));
      
    }
    else{
      alert("An Error Occured!");

    }


    }

    const changeData = (e) =>{
      let input_name = e.target.name ;
     let  value = e.target.value ;
    setuser({...user , [input_name]:value})

    }
    const redirect = () =>{
        navigate("/admin/app" , {replace:true})
    }

  return (
      <>
    <div className="wrapper">
  <div className="profile-card js-profile-card">
    <div className="profile-card__img">
      <img src= {deepak} alt="profile card" />
    </div>

    <div className="profile-card__cnt js-profile-cnt">
      <div className="profile-card__name">
      <TextField   label = "Your Name" name = 'name' value = {user.name} onChange = {changeData} />
      </div>
      <div className="profile-card__txt">Software<strong>   Developer</strong></div>
      <div className="profile-card-loc">
       

        <span className="profile-card-loc__txt">
          Haryana, India(IN)
        </span>
      </div>

      <div className="profile-card-inf">
        <div className="profile-card-inf__item">
           <TextField   label = "Your Email" name='email' value = {user.email} onChange = {changeData} />
        </div>
      </div>

     

      <div className="profile-card-ctr">
        <button className="profile-card__button button--blue js-message-btn" onClick = {sendData}>Save</button>
        <button className="profile-card__button button--orange" onClick={redirect}>Don't Save</button>
      </div>
    </div>

    

  </div>

</div>
</>
  )
}

export default Profile