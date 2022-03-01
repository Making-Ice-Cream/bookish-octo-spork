import React from 'react'
import "./Profile.css"
import "./Profiles.js" 
import {TextField } from '@mui/material';
import deepak from "../../images/deepak2.jpeg"

const Profile = () => {
  return (
      <>
    <div className="wrapper">
  <div className="profile-card js-profile-card">
    <div className="profile-card__img">
      <img src= {deepak} alt="profile card" />
    </div>

    <div className="profile-card__cnt js-profile-cnt">
      <div className="profile-card__name">
      <TextField   label = "Your Name" value = "Deepak Yadav"/>
      </div>
      <div className="profile-card__txt">Software<strong>   Developer</strong></div>
      <div className="profile-card-loc">
       

        <span className="profile-card-loc__txt">
          Haryana, India(IN)
        </span>
      </div>

      <div className="profile-card-inf">
        <div className="profile-card-inf__item">
           <TextField   label = "Your Email" value = "deepakrao0223@gmail.com" />
        </div>
      </div>

     

      <div className="profile-card-ctr">
        <button className="profile-card__button button--blue js-message-btn">Save</button>
        <button className="profile-card__button button--orange">Don't Save</button>
      </div>
    </div>

    

  </div>

</div>
</>
  )
}

export default Profile