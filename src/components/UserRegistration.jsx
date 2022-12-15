import React, { useContext, useEffect, useState } from 'react';
import '../css/registration.css';
import RegisterationStatus from './RegistrationStatus';
import ImageUploading from 'react-images-uploading';
import img from '../assets/upload.png'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import AuthContext from '../store/AuthContext';




const UserRegistration = () => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [ registerationResponse, setRegisterationResponse ] = useState()
    const [data, setData ] = useState(null)

    const [ formComplete, setFormComplete ] = useState( false )
    const [error, setError] = useState('')
    const [isPending, setIspending] = useState(false)
    const userData = {email, password, first_name, last_name, phone_number, address}

    const maxNumber = 1;
  const [ images, setImages ] = useState( [] );
  
  const navigate = useNavigate()

  const {setAuth, auth, accountType, setAccountType, token, setToken} = useContext(AuthContext)


  const url = "https://api.cloudinary.com/v1_1/dywawv0tg/image/upload";

    // image upload onchange function
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        const formData = new FormData();
        formData.append( "file", imageList[0].data_url );
        formData.append( "upload_preset", "m8ajjegp" );
        
        fetch(url, {
          method: "POST",
          body: formData
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setData( data.url )
            // console.log(data)
          } );
      
      // console.log(data)
    
        setImages(imageList);  
        
      };

    //form submit handler
    
      const handleSubmit=(e)=>{
        e.preventDefault();


        if (images.length > 0){
          userData.image = data
        } else {
          setError('Please Upload your picture')
        }

        try {
          if (password === confirmPassword){
            setPasswordMatch( true )
            setFormComplete(false)
  
            setIspending(true)
            fetch( ' http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-type':'application/json',
                crossDomain: true,
                withCredentials: true
              },
              body: JSON.stringify(userData)
            }).then(response => {
              return response.json()
              // if(response.ok){
              // }
          }).then(data => {
            
            setIspending( false )
            if ( typeof data === 'string' ) {
              setError( data );
            } else {
              setRegisterationResponse( data );
              setError( '' );
              setAuth( { data: data.user } );
              // setToken( data.accessToken );
              sessionStorage.setItem( 'userToken', data.accessToken )
              sessionStorage.setItem('userId', data.user.id)
              setAccountType( 'user' );
              // alert( 'Registration Successful' );
              navigate( '/' );
              
              
              // console.log(data)
              // navigate('/sign-in', {state: {success: true}})
            } 
            // console.log(data)
            // console.log(token)
          })
          }else{
            setPasswordMatch(false)
          }
        } catch (error) {
          setError( error.message)
          // console.log(error)
        }

        
            
    }



  return (
    <div className='user-form-cont'>
      {/* { formComplete && <Alert variant='success'>Registration Successful</Alert>} */}
          <form className='user-reg-form' onSubmit={handleSubmit}>
        {/* image uploader */}
          <ImageUploading
                      multiple={false}
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <div className='picture-cont'>
                            {
                              images.length > 0 ? <> 
                              <img onClick={()=>{setImages([]); return onImageUpload()}} className='profile-picture' src={imageList[0].data_url} alt="" width="100" /> 
                              </> : 
                              <img onClick={()=>{setImages([]); return onImageUpload()}} className='avatar' src={img} alt=''/>
                            }
                          </div>
                        </div>
                      )}
              </ImageUploading>
              
              <div className='cont-input-triangle'>
                  <div className='triangle'></div>
                  <div className='inputs'>
                      <div className='names'> 
                          <input type='text' name = 'first' placeholder='First Name' onChange = {(e)=>setFirstName(e.target.value)} value = {first_name} required/><br/>
                          <input type='text' placeholder='Last Name' onChange = {(e)=>setLastName(e.target.value)} value = {last_name} id='last-name' required/><br/>
                      </div>

                      <div className='merged-fields'> 
                        <input type='email' placeholder='Email' onChange = {(e)=>setEmail(e.target.value)} value = {email} required/><br/>
                        <input type='text' placeholder='Phone' onChange = {(e)=>setPhone(e.target.value)} id='phone' value = {phone_number} required/><br/>
                      </div>
                      <input type='text' placeholder='address' onChange = {(e)=>setAddress(e.target.value)} value = {address} required/><br/>
                      
                      <input type='password' required placeholder='password' onChange = {(e)=>setPassword(e.target.value)} value = {password}/><br/>
                      <input type='password' required placeholder='confirm password' onChange = {(e)=>setConfirmPassword(e.target.value)} value = {confirmPassword}/><br/>
                      {
                      
                      ((userData.first_name.length > 0 && userData.last_name.length > 0 && userData.email.length > 0 && userData.phone_number.length > 0
                         && userData.address.length > 0 && userData.password.length > 0 && (confirmPassword === password)) && !isPending) ? <button  className='submit-registration'>Register</button> 

                      :

                      (userData.first_name.length > 0 && userData.last_name.length > 0 && userData.email.length > 0 && userData.phone_number.length > 0
                        && userData.address.length > 0 && userData.password.length > 0 && (confirmPassword === password)) && isPending? <button disabled className='disabled'>Registering</button>

                      :

                      <button disabled className='disabled'>Register</button>
                         
                      }
                      
                     

                      {/* Error messages */}
                      {
                      
                        error.length > 0 ? <RegisterationStatus status={error}/> : 

                        (confirmPassword.length > 0) && (password !== confirmPassword) && <RegisterationStatus className='password-match' status='passwords do not match'/>
                      }

                <p className='mt-3 mb-0'>Already a member? <Link to ='/sign-in'>Sign In</Link></p>
                  </div>
                </div>

      </form>
      

    </div>
  )
}

export default UserRegistration