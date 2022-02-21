import React from 'react'
import "../AllCSS/ContactDev.css"
import deepak from "../images/deepak.jpeg"
import shreenav from "../images/shreenav.jpeg"

const ContactDev = () => {
  return (
    <div className="c_d_body">
        <div className="c_d_container">
            <div className="c_d_cards">
            <div className="c_d_imgBox">
                    <img src={shreenav} alt = "" />
                </div>
                <div className="content">
                    <div className="c_d_details">
                        <h2>Shreenav Khandelwal<br /><span>Senior Developer</span></h2>
                        <ul className="social_icons">
                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="c_d_cards">
            <div className="c_d_imgBox">
                    <img src={deepak} alt = "" />
                </div>
                <div className="content">
                    <div className="c_d_details">
                        <h2>Deepak Yadav<br /><span>Senior Developer</span></h2>
                        <ul className="social_icons">
                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactDev