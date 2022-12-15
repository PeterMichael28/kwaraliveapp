import React, { useContext, useEffect, useState } from 'react';
import '../css/registration.css';
import RegisterationStatus from '../components/RegistrationStatus';
import ImageUploading from 'react-images-uploading';
import img from '../assets/upload.png'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import AuthContext from '../store/AuthContext';

const UpdateUserProfile = () => {




    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')
    const [isPending, setIspending] = useState(false)
    const userData = {email, first_name, last_name, phone_number, address}

    const maxNumber = 1;
  const [ images, setImages ] = useState( [] );
  
  const navigate = useNavigate()

  const {setAuth, auth} = useContext(AuthContext)


    // image upload onchange function
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);  
        
      };

    //form submit handler
    
      const handleSubmit=(e)=>{
        e.preventDefault();


        if (images.length > 0){
          let image = images[0].data_url.split(',')[1]
          userData.image = image
        } else {
          setRegisterationResponse('Please Upload your picture')
        }

        try {
          if (password === confirmPassword){
            setPasswordMatch( true )
            setFormComplete(false)
  
            setIspending(true)
            fetch( 'http://localhost:3000/users', {
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
              setError( data)
            } else {
              setRegisterationResponse( data )
              setError( '' )
              setAuth( { data: data.user } )
              setAccountType('user')
              alert( 'Registration Successful' );
              navigate('/')
              
            }
            // console.log(data)
            // navigate('/sign-in', {state: {success: true}})
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
                      
                      {
                      
                      ((userData.first_name.length > 0 && userData.last_name.length > 0 && userData.email.length > 0 && userData.phone_number.length > 0
                         && userData.address.length > 0 && userData.password.length > 0 && (confirmPassword === password)) && !isPending) ? <button  className='submit-registration'>Update Profile</button> 

                      :

                      (userData.first_name.length > 0 && userData.last_name.length > 0 && userData.email.length > 0 && userData.phone_number.length > 0
                        && userData.address.length > 0 && userData.password.length > 0 && (confirmPassword === password)) && isPending? <button disabled className='disabled'>Updating Profile</button>

                      :

                      <button disabled className='disabled'>Update Profile</button>
                         
                      }
                      
                     

                      {/* Error messages */}
                      {
                      
                        error.length > 0 ? <RegisterationStatus status={error}/> : 

                        (confirmPassword.length > 0) && (password !== confirmPassword) && <RegisterationStatus className='password-match' status='passwords do not match'/>
                      }

                
                  </div>
                </div>

      </form>
      

    </div>
  )
}

export default UpdateUserProfile