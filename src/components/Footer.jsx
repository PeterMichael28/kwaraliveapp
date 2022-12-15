import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/app-store.png';
import img2 from '../assets/play-store.png';


const currentDate = Date().split(' ')[3]

const Footer = () => {
  return (
    <footer>
            <section className='section-cont'>
                <div id='mobile' className='sections'>
                    <h5>Mobile</h5>
                    <div>
                        <a className='footer-links' href='https://play.google.com/store/apps/details?id=com.kwaralive.app'>
                            <img src={img1} className='android' />
                        </a>
                        <Link className='footer-links' to='/'><img src={img2} className='ios'/></Link>
                    </div>
                    
                </div>
                <div id='about' className='sections about'>
                   
                    <h5>About</h5> 
                    <div>
                        <Link className='footer-links' to='/'>Privacy Policy</Link>
                        <Link className='footer-links' to='/'>Terms and Conditions</Link>
                    </div>
                    
                    
                </div>
              <div className='sections others'>
                  <h5>Others</h5>
                  <div className='footer-lists'>  
                    <Link className='footer-links' to='/'>Advertising</Link>
                    <Link className='footer-links' to='/'>Privacy</Link>
                    <Link className='footer-links' to='/'>Categories</Link>
                    <Link className='footer-links' to='/'>Questions</Link>
                  </div>
                </div>
            </section>
            {/* WhatsApp icon */}
      <a
        href="https://wa.me/2348127277493"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

            <p className='copyright'>&copy; kwaralive {currentDate}</p>
        </footer>
  )
}

export default Footer