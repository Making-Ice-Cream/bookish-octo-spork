import React from 'react'
import "../AllCSS/ContactDev.css"
import deepak from "../images/deepak1.jpeg"
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
                        <h2>Shreenav Khandelwal<br /><span>Software Developer</span></h2>
                        <ul className="social_icons">
                            <li><a href="https://www.facebook.com/shreenav.khandelwal" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="https://github.com/shreenav" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>
                            <li><a href="https://www.instagram.com/shreenavkhandelwal" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/shreenav-khandelwal-a8b2591b5" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></li>
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
                        <h2>Deepak Yadav<br /><span>Software Developer</span></h2>
                        <ul className="social_icons">
                            <li><a href="https://www.facebook.com/deepakrao0223" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="https://github.com/deepakyadav0223" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>
                            <li><a href="https://www.instagram.com/deepak_yadav_1011/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/deepak-yadav-63068320a" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactDev