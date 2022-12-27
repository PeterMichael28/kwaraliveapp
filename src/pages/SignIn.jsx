import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/signup.css';
import RegisterationStatus from '../components/RegistrationStatus';
import AlertMsg from '../components/AlertMsg';
import AuthContext from '../store/AuthContext';
import Back from '../components/Back';
import axios from 'axios';
import img12 from '../assets/loader.gif'

const SignIn = () => {

    const [email, setEmail] = useState('')
  const [ password, setPassword ] = useState( '' )
  const [success, setSuccess] = useState(false)
  const [selectAccount, setAccount] = useState('')
    const [error, setError] = useState('')
    const [ isPending, setIspending ] = useState( false )
    const [registerationResponse, setRegisterationResponse] = useState([])
  const user_data = { username:email, password }

  const navigate = useNavigate()
  const url = 'http://api.kwaralive.com/v1/login'
  const url2 = 'http://localhost:3000/topBusinesses'
  
  const {setAuth, auth, accountType, setAccountType, token, setToken} = useContext(AuthContext)
    //form submit handler
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIspending(true)

    try {
      const response = await axios.post( url, user_data);
      // console.log( response.data );
      localStorage.setItem("access_token", response.data.access_token);
       localStorage.setItem("userId", response.data.id);
      setError( '' )
      setIspending( false )
      navigate( '/', {state: {message: 'Login Successful, Welcome back!!!'}} );
      
    } catch (error) {
      console.error( error.response.data.message );
      setError(  error.response.data.message )
      setIspending( false )
    }
   
  }


  return (
    <div className='user-form-cont'>
      <Back />

      { success === false ? ' ' : <AlertMsg message='Registration Successful' /> }
      
      {isPending ? <img src={img12} className='signin-loader' alt="" /> : <form className='user-reg-form mt-5 mt-sm-0' onSubmit={handleSubmit}>
              <div className='cont-input-triangle'>
                  <div className='triangle'></div>
                  <div className='inputs'>
               
                          <input type='text' name = 'Email' placeholder='Email' onChange = {(e)=>setEmail(e.target.value)} value = {email} required/><br/>
                          <input type='password' placeholder='Password' onChange = {(e)=>setPassword(e.target.value)} value = {password} required/><br/>
                        
                     

                     
                      {
                          
                      ((user_data.username.length > 0 && user_data.password.length > 0 && !isPending) ? <button  className='submit-registration'>Login</button> 

                      :

                      (user_data.username.length > 0 && user_data.password.length > 0) && isPending ? <button disabled className='disabled'>LoginIn ...</button>

                      :

                      <button disabled className='disabled'>Login</button>
                    )}
                      
                         

                      
                     

                      {/* Error messages */ }
                      
                      {
                        error?.length > 0 && <RegisterationStatus status={error} />
                      }

            <p className='mt-4'>Dont have an account yet? <Link to='/sign-up'>Sign Up</Link></p>
                  </div>
                </div>

          </form> }
          

    </div>
  )
}

export default SignIn