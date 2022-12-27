import React, {useContext, useState} from 'react';
import RegisterationStatus from './RegistrationStatus';
import ImageUploading from 'react-images-uploading';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import axios from "axios";

const CompleteBusinessReg = () => {

    const [businessLogo, setBusinessLogo] = useState([]);
    const [businessImages, setBusinessImages] = useState([]);
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const [registrationResponseMessage, setRegistrationResponseMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
  const [ error, setError ] = useState( '' )
  const [ dataUrl, setDataUrl ] = useState( null )
  const [images, setImages] = useState([])

  const navigate = useNavigate()

  const url = "https://api.cloudinary.com/v1_1/dywawv0tg/image/upload";
  const base_url = "http://api.kwaralive.com/v1/business/register";
  
  const {setAuth, auth, accountType, setAccountType} = useContext(AuthContext)

    // let images = []
    const maxNumber = 10;
    
    // let data = props.location.data
    // console.log(data)

    
    const location  = useLocation()
    const data = location.state.data


    //business logo handler
    const onChangeLogo = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setBusinessLogo(imageList);
        //data.logo =  businessLogo
        
    };
    
    //business images handler
    const onChangeBusinessImages = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
      
      
      setBusinessImages( imageList );
        
  };
  
  const businessImagesToArray=()=>{
    businessImages.forEach((businessImage)=>{
      images.push(businessImage.data_url.split(',')[1])
    })

    data.image = images
    data.nature_of_business = data.category
    

    if (businessLogo.length > 0){
      data.business_logo = businessLogo[0].data_url.split(',')[1]
    }

    return data
  }
    



    //form submit handler    
    const handleSubmit= async () =>{
      setIsPending( true )
      
      const completeBusinessData = await businessImagesToArray()
      
      // console.log('data', data )

              try{
            const response = await axios.post( base_url, data, {
              headers: {
                'Content-type':'application/json',
                crossDomain: true,
                }
              } );
              // if ( typeof response.data.message === 'string' ) {
              //   setError( response.data.message );
              //   // console.log( response)
              // } else {
              //   // localStorage.setItem("access_token", response.data.login_details.access_token);
              //   // localStorage.setItem("userId", response.data.login_details.id);
              //   setError( '' );
              // console.log( response )
              //   // navigate( '/' );
              // }
             setIsPending(false);
           } catch (error) {
            setError(error.response.data?.message);
            // console.log(error.response.data.message)
            setIsPending(false);
            }

      // console.log(data)

      setIsPending(false)
     
       
      }
    
  return (
    <div className='user-form-cont'>
      <div className='complete-reg'>
        {/* <div>{ error && error}</div> */}
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
        <button className='submit-registration' onClick={handleSubmit}>register</button>
        :
        (businessImages.length > 0 && isPending) ?
        <button className='disabled' disabled>registering ...</button>
        :
        <button className='disabled' disabled>register</button>
      }
    </div>
    {
     error.length > 0 && <RegisterationStatus status={error}/>
    }
</div>
  )
}

export default CompleteBusinessReg