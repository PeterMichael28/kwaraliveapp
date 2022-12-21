import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/signup.css';
import RegisterationStatus from '../components/RegistrationStatus';
import AlertMsg from '../components/Alert';
import AuthContext from '../store/AuthContext';
import Back from '../components/Back';

const SignIn = () => {

    const [email, setEmail] = useState('')
  const [ password, setPassword ] = useState( '' )
  const [success, setSuccess] = useState(false)
  const [selectAccount, setAccount] = useState('')
    const [error, setError] = useState('')
    const [ isPending, setIspending ] = useState( false )
    const [registerationResponse, setRegisterationResponse] = useState([])
  const userData = { email, password }

  const navigate = useNavigate()
  
  const {setAuth, auth, accountType, setAccountType, token, setToken} = useContext(AuthContext)
    //form submit handler
    
    const handleSubmit=(e)=>{
      e.preventDefault();

      // if ( selectAccount === 'user' ) {
      //   setAccountType( selectAccount )
      //   setAuth({data: {images: 'https://tse4.mm.bing.net/th?id=OIP.V-rXEgNlJT2MObeMatxAOgHaHa&pid=Api&P=0'}})
      //   // console.log('user account')
      // } else {
      //   setAccountType( selectAccount )
      //   setAuth({data: {images: 'https://tse4.mm.bing.net/th?id=OIP.0ku1AvUo__-ohxH4EqTXOAHaEo&pid=Api&P=0'}})
      //   // console.log('business account')
      // }
      // navigate('/')
      
      // console.log(accountType)

      if ( selectAccount === 'user' ) {
        try {
          setIspending(true)
          fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
              crossDomain: true,
              withCredentials: true
            },
            body: JSON.stringify(userData)
          }).then(response => {
            return response.json()
          } ).then( data => {
          
            if ( typeof data === 'string' ) {
              setError( data )
              setIspending( false )
            } else {
              setRegisterationResponse( data )
              console.log(data)
              setError( '' )
              setIspending( false )
              setAuth( { data: data.user } ); //setting current user
              localStorage.setItem(
               "userToken",
               data.accessToken
              );
              localStorage.setItem("userId", data.user.id);
              // setToken(data.accessToken)
              alert( 'Login Successful' );
              setAccountType( selectAccount )
              
              navigate('/')
            }
          
          // console.log(data)
          
        })
        } catch (error) {
          setError(error)
        }
      } else {
        try {
          setIspending(true)
          fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
              crossDomain: true,
              withCredentials: true
            },
            body: JSON.stringify(userData)
          }).then(response => {
            return response.json()
          } ).then( data => {
          
            if ( typeof data === 'string' ) {
              setError( data )
              setIspending( false )
            } else {
              setRegisterationResponse( data )
              console.log(data)
              setError( '' )
              setIspending( false )
              setAuth( { data: data.user } ); //setting current user
              setToken(data.accessToken)
              alert( 'Login Successful' );
              setAccountType(selectAccount)
              navigate('/')
            }
          
          // console.log(data)
          
        })
        } catch (error) {
          setError( error )
        }
      }
      
      // try {
      //   setIspending(true)
      //   fetch('http://localhost:3000/login', {
      //     method: 'POST',
      //     headers: {
      //       'Content-type':'application/json',
      //       crossDomain: true,
      //       withCredentials: true
      //     },
      //     body: JSON.stringify(userData)
      //   }).then(response => {
      //     return response.json()
      //   } ).then( data => {
        
      //     if ( typeof data === 'string' ) {
      //       setError( data )
      //       setIspending( false )
      //     } else {
      //       setRegisterationResponse( data )
      //       console.log(data)
      //       setError( '' )
      //       setIspending( false )
      //       setAuth( { data: data.user } ) //setting current user
      //       alert( 'Login Successful' );
      //       navigate('/')
      //     }
        
      //   // console.log(data)
        
      // })
      // } catch (error) {
        
      // }

         
            // console.log(userData)
            // setIspending(false)
            
    }


  return (
    <div className='user-form-cont'>
      <Back />
      {success === false ? ' ' : <AlertMsg message='Registration Successful' />}
          <form className='user-reg-form mt-5 mt-sm-0' onSubmit={handleSubmit}>
              <div className='cont-input-triangle'>
                  <div className='triangle'></div>
                  <div className='inputs'>
               
                          <input type='text' name = 'Email' placeholder='Email' onChange = {(e)=>setEmail(e.target.value)} value = {email} required/><br/>
                          <input type='password' placeholder='Password' onChange = {(e)=>setPassword(e.target.value)} value = {password} required/><br/>
                        
                            <select name="account" id="account" className='mb-4' value={selectAccount} onChange={(e) => setAccount(e.target.value)}>
                              <option value="">--select account type--</option>
                              <option value="user">Regular User</option>
                              <option value="business">Business Owner</option>
                            </select>
                     

                     
                      {
                          
                      ((userData.email.length > 0 && userData.password.length > 0 && !isPending && selectAccount !== '') ? <button  className='submit-registration'>Login</button> 

                      :

                      (userData.email.length > 0 && userData.password.length > 0 && selectAccount !== '') && isPending ? <button disabled className='disabled'>LoginIn ...</button>

                      :

                      <button disabled className='disabled'>Login</button>
                    )}
                      
                         

                      
                     

                      {/* Error messages */ }
                      
                      {
                        error.length > 0 && <RegisterationStatus status={error} />
                      }

            <p className='mt-4'>Dont have an account yet? <Link to='/sign-up'>Sign Up</Link></p>
                  </div>
                </div>

          </form>

    </div>
  )
}

export default SignIn