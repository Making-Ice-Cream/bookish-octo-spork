import React from 'react';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
  } from 'mdb-react-ui-kit';

import img1 from "../images/chris-montgomery-smgTvepind4-unsplash.jpg"

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
              <MDBCarouselElement src="https://c.pxhere.com/photos/d4/d4/university_lecture_campus_education_people_seminar_study_school-1246944.jpg!d" style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase",color:"yellow",backdropFilter:"blur(17px)",}}>Execulsive Classrooms</h3>
                <p style={{color:"red",backdropFilter:"blur(12px)"}}>Classrooms equipped with modern technologies.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            
            <MDBCarouselItem >
              <MDBCarouselElement src="https://c.pxhere.com/photos/da/af/books_bookstore_book_reading_shop_writer_sale_books_read-822866.jpg!d" style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style = {{backdropFilter:"blur(10px)"}}>Books & Library</h3>
               
              </MDBCarouselCaption>
            </MDBCarouselItem>

            <MDBCarouselItem>
              <MDBCarouselElement src="https://c.pxhere.com/photos/d3/67/psu-234130.jpg!d" style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase"}}>Trained Faculty</h3>
                <p>Self motiviated & trained faculty.</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
    
            <MDBCarouselItem>
              <MDBCarouselElement src="https://c.pxhere.com/photos/c7/c8/adults_brainstorming_business_computer_desk_discussion_education_facial_expression-1562525.jpg!d" style={{height:"600px"}} alt='...' />
              <MDBCarouselCaption>
                <h3 style={{textTransform:"uppercase", color:"red",backdropFilter:"blur(10px)",display:"inline-block",width:"40%"}}>Weekly Assements</h3>
                
              </MDBCarouselCaption>
            </MDBCarouselItem>
          
            
          </MDBCarouselInner>
        </MDBCarousel>
      );
};

export default Crousel;
