import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import logo3 from '../assets/logo.jpg'
import logo2 from '../assets/search.png'
import '../css/Nav.css'
import AuthContext from '../store/AuthContext';


const Nav = () => {
  const { auth, setAuth, accountType} = useContext( AuthContext )

  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("access_token");


  const handleClick = () => {
   setAuth(null);
   localStorage.clear();
   // console.log(auth)
  };

  return (
    <nav className={ auth === null ? 'justify-content-center' : ''}>
      {auth? auth !== null && auth.business_name ? <Link to={`/business-profile/${auth.id}`} ><img className='pro-img me-3' src={ auth.logo } alt='' /></Link> :
              <Link to={`/user-profile/${id}`} ><img className='pro-img me-3' src={ auth.profile_picture ===null? logo3 : auth.profile_picture } alt='' /></Link> : ''  }
            <ul>
                <li className='nav-links'><Link className='link' to='/'>Home</Link></li>
                { !auth && <li className='nav-links'><Link className='link' to='/sign-up'>Sign Up</Link></li>}
                <li><img src={logo} height='50px' className='img'/></li>
                <li className='nav-links'><Link className='link' to='/'>About</Link></li>
                { auth !== null ?  <li className='nav-links link logout' onClick={handleClick}>Log Out</li> : <li className='nav-links'><Link className='link' to='/sign-in'>Sign In</Link></li>}
                <li><Link className='link search mt-3 mt-sm-0' to='/search'><img src={logo2} height='40px'/></Link></li>
            </ul>
        </nav>
  )
}

export default Nav