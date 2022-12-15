import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../css/coverpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/three.png'
import img2 from '../assets/four.png'
import img3 from '../assets/five.png'

const CoverPage = () => {
  return (
       <div className='cover-page mt-1'>
            <Carousel controls={false} interval={3000} indicators= {true } fade={true}>
                {/*<Carousel.Item >
                    <img className='d-block w-100' src='images/one.png' alt=''/>

                    <Carousel.Caption>
                        <div id='caption1'>
                            <div className='line'></div>
                            <Link id='call-to-action1' to='/sign-up'>Get started</Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>*/}

               

                <Carousel.Item >
                    <img id='img3' className='d-block w-100' src={img1} alt=''/>

                    <Carousel.Caption>
                    <div id='caption3'>
                            <div className='line'></div>
                            <Link id='call-to-action3' to='/sign-up'>Register</Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item >
                    <img className='d-block w-100' src={img2} alt=''/>

                    <Carousel.Caption>
                    <div id='caption4'>
                            <div className='line'></div>
                            <Link id='call-to-action4' to='/sign-up'>Register</Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item >
                    <img className='d-block w-100' src={img3} alt=''/>

                    <Carousel.Caption>
                    <div id='caption5'>
                            <div className='line'></div>
                            <Link id='call-to-action5' to='/sign-up'>Register</Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    </div>
  )
}

export default CoverPage