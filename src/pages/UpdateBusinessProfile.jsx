import React, {useContext, useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@mui/material';
// import { topBusinesses } from './datas';
import RegisterationStatus from '../components/RegistrationStatus';
import ImageUploading from 'react-images-uploading';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../store/AuthContext';

const UpdateBusinessProfile = () => {


    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [business_name, setBusinessName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [website_url, setWebsiteUrl] = useState('')
    const [business_description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [ categories, setCategories ] = useState( [] )
    const [businessLogo, setBusinessLogo] = useState([]);
    const [businessImages, setBusinessImages] = useState([]);
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const [registrationResponseMessage, setRegistrationResponseMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [ error, setError ] = useState( '' )
    const businessData  =  {first_name, last_name, email, phone_number, address, password, business_name, website_url, business_description, category}

  const navigate = useNavigate()
  
  const {setAuth, auth, accountType, setAccountType} = useContext(AuthContext)

    let images = []
    const maxNumber = 10;
    


    //business logo handler
    const onChangeLogo = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setBusinessLogo(imageList);
        //businessData.logo =  businessLogo
        
    };
    
    //business images handler
    const onChangeBusinessImages = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setBusinessImages(imageList);
        
    };
    

    //business images converted to an array
    const businessImagesToArray=()=>{
        businessImages.forEach((businessImage)=>{
          images.push(businessImage.data_url.split(',')[1])
        })
  
        businessData.image = images
        businessData.nature_of_business = businessData.category
        
  
        if (businessLogo.length > 0){
          businessData.business_logo = businessLogo[0].data_url.split(',')[1]
        }
  
        return businessData
    }
    

    const showCategories=()=>{
        const categoryContainer = document.querySelector('.radio-group')
        categoryContainer.style.display = 'block'
  }
  
  useEffect(()=>{
          setCategories(topBusinesses)
          // console.log(categories)
}, [])



  return (
    <div className='user-form-cont'>
    <form className='user-reg-form'>
         <div className='inputs'>
             <div className='names'> 
                 <input type='text' name = 'first' placeholder='First Name' required value={first_name} onChange={(e)=>setFirstName(e.target.value)}/>
                 <br/>
                 <input type='text' placeholder='Last Name' id='last-name' required value={last_name} onChange={(e)=>setLastName(e.target.value)}/>
                 <br/>
             </div>
             
             <div className='merged-fields'>
                 <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                 <br/>
                 <input type='text' placeholder='Phone' id='phone' required value={phone_number} onChange={(e)=>setPhone(e.target.value)}/><br/>                                                                                    
             </div>
             <input type='text' placeholder='Business Name' required value={business_name} onChange={(e)=>setBusinessName(e.target.value)}/><br/>
             <div className='merged-fields'>
                 <input type='text' placeholder='Website Url' id='website-url' value={website_url} onChange={(e)=>setWebsiteUrl(e.target.value)}/>
                 <br/>
                 <p id='business-category' className='select-cont' onClick={showCategories}>{category.length > 0 ? category : 'select business category'}</p>  
             
             <div  className='radio-group'>
                 {<RadioGroup onChange={(e)=> {
                         setCategory(e.target.value)
                         document.querySelector('.radio-group').style.display = 'none'
                     }
                 }
                     value = {category}
                     children= {
                     categories.map((businessCategory) =>{
                         return (
                             <div key={businessCategory.id} className='radio-option'><p>{businessCategory.category}</p> <Radio className='radio-button' checked={businessCategory.category === category && true} value={businessCategory.category}/> 
                         </div>
                         )
                     })
                     }/>}
             </div>
                                                                                                          
             </div>
             <input type='text' placeholder='address' required value={address} onChange={(e)=>setAddress(e.target.value)}/><br/>
             <div className='merged-fields'>
                 <input type='password' required placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>                                                                                                                                                                    
               <input type='password' required placeholder='confirm password' id='confirm' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/><br/>                                                                                                                      
             </div>
             <textarea placeholder='business description' className='business-description' value={business_description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
             
             {
               ((confirmPassword.length >= password.length  ) && (password!== confirmPassword)) &&
               <div className='password-match'>
                 <p>passwords do not match</p>
                 
               </div>
             }  


<div className='complete-reg'>
      <div className='complete-images'>
      <ImageUploading
                multiple={false}
                value={businessLogo}
                onChange={onChangeLogo}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <div className='business-picture-cont' onClick={()=>{setBusinessLogo([]); return onImageUpload()}}>
                      {
                        businessLogo.length > 0 ? <> 
                        <img  className='profile-picture' src={imageList[0].data_url} alt="" width="100" /> 
                        </> : 
                        <p className='upload-logo' >upload a logo</p>
                      }
                              
                    </div>
                    
                  </div>
                )}
                  </ImageUploading>
                  
                    <ImageUploading
                multiple={true}
                value={businessImages}
                onChange={onChangeBusinessImages}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    
                    <div className='business-picture-cont' onClick={()=>{setBusinessImages([]); return onImageUpload()}}>
                      
                        <p className='upload-logo' >{
                          businessImages.length > 0 ? businessImages.length + ' images selected' : 'upload images'
                        }</p>
                        
                              
                    </div>
                  </div>
                )}
            </ImageUploading>
      </div>

      {
        (businessImages.length > 0 && !isPending) ?
        <button className='submit-registration' onClick={handleSubmit}>Update Profile</button>
        :
        (businessImages.length > 0 && isPending) ?
        <button className='disabled' disabled>Updating ...</button>
        :
        <button className='disabled' disabled>Updating Profile</button>
      }
    </div>
    {
     error.length > 0 && <RegisterationStatus status={error}/>
    }
           
             
         </div>

         
         
     </form>
</div>
  )
}

export default UpdateBusinessProfile