import React from 'react';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
  } from 'mdb-react-ui-kit';

import img1 from "../images/chris-montgomery-smgTvepind4-unsplash.jpg"
import img2 from "../images/Image2.jpg"
import img3 from "../images/Image3.jpg"
import img4 from "../images/Image4.jpg"
import img5 from "../images/Image5.jpg"

const Crousel = () => {
    return (
        <MDBCarousel showIndicators showControls  fade className='my-2'>
          <MDBCarouselInner>
            <MDBCarouselItem className='active'>
              <MDBCarouselElement src={img1} alt='...' style={{height:"600px"}} />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase",color:"cyan"}}>A New Way of Learning</h3>
                <p style = {{color:"red"}}>On Seeing the Ongoing conditions, we changed our way of teaching.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
    
            <MDBCarouselItem >
              <MDBCarouselElement src={img2} style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase",color:"yellow",backdropFilter:"blur(17px)",}}>Execulsive Classrooms</h3>
                <p style={{color:"red",backdropFilter:"blur(12px)"}}>Classrooms equipped with modern technologies.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            
            <MDBCarouselItem >
              <MDBCarouselElement src= {img3} style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style = {{backdropFilter:"blur(10px)"}}>Books & Library</h3>
               
              </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem>
              <MDBCarouselElement src={img4} style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase"}}>Trained Faculty</h3>
                <p>Self motiviated & trained faculty.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
    
            <MDBCarouselItem>
              <MDBCarouselElement src={img5} style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase", color:"red",backdropFilter:"blur(10px)",display:"inline-block",width:"40%"}}>Weekly Assements</h3>
                
              </MDBCarouselCaption>
            </MDBCarouselItem>
          
            
          </MDBCarouselInner>
        </MDBCarousel>
      );
};

export default Crousel;
