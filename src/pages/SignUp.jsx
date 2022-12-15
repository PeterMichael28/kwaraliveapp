import React from 'react'
import { Link } from 'react-router-dom';
import Back from '../components/Back';
import '../css/signup.css';

const SignUp = () => {
  return (
    <div className='signup-cont'>
        <Back />
            <div className='register'>
                <h4>Register as</h4>
                <ul>
                    <li><Link to='/sign-up/register_business' className='registration-link'>A business owner</Link></li>
                    <li><Link to='/sign-up/register_user' className='registration-link'>A regular user</Link></li>
                </ul>
            </div>
           
        </div>
  )
}

export default SignUp