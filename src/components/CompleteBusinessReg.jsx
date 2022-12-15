import React, {useContext, useState} from 'react';
import RegisterationStatus from './RegistrationStatus';
import ImageUploading from 'react-images-uploading';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../store/AuthContext';

const CompleteBusinessReg = () => {

    const [businessLogo, setBusinessLogo] = useState([]);
    const [businessImages, setBusinessImages] = useState([]);
    const [registrationStatus, setRegistrationStatus] = useState(false);
    const [registrationResponseMessage, setRegistrationResponseMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
  const [ error, setError ] = useState( '' )
  const [ data, setData ] = useState( null )
  const [images, setImages] = useState([])

  const navigate = useNavigate()

  const url = "https://api.cloudinary.com/v1_1/dywawv0tg/image/upload";
  
  const {setAuth, auth, accountType, setAccountType} = useContext(AuthContext)

    // let images = []
    const maxNumber = 10;
    
    // let businessData = props.location.businessData
    // console.log(businessData)

    
    const location  = useLocation()
    const businessData = location.state.businessData


    //business logo handler
    const onChangeLogo = (imageList, addUpdateIndex) => {
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
        setBusinessLogo(imageList);
        //businessData.logo =  businessLogo
        
    };
    
    //business images handler
    const onChangeBusinessImages = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
      
      for ( let i = 0; i < imageList.length; i++ ) {
        let file = imageList[ i ];

        // console.log(file.data_url.split(',')[1])

          const formData = new FormData();
        formData.append( "file", file.data_url );
        formData.append( "upload_preset", "m8ajjegp" );
        
        fetch(url, {
          method: "POST",
          body: formData
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // setData( data )
            // images.push( data.url )
            // console.log(images)
            setImages((pre) => [...pre, data.url])
          } );
      }
      
      setBusinessImages( imageList );
      
      // console.log(imageList)
        
    };
    

    //business images converted to an array
    // const businessImagesToArray=()=>{
    //     businessImages.forEach((businessImage)=>{
    //       images.push(businessImage.data_url.split(',')[1])
    //     })
  
    //     businessData.image = images
    //     businessData.nature_of_business = businessData.category
        
  
    //     if (businessLogo.length > 0){
    //       // businessData.business_logo = businessLogo[0].data_url.split(',')[1]
    //       businessData.business_logo = businessLogo[0].data_url
    //     }
  
    //     return businessData
    // }


    //form submit handler    
    const handleSubmit= async () =>{
      
        setIsPending(true)
      //   const completeBusinessData = await businessImagesToArray()
   
      // console.log( completeBusinessData )

      if (businessLogo.length > 0){
              businessData.business_logo = data
            }
      if ( images.length > 0 ) {
        businessData.image = images
        
      }
          businessData.nature_of_business = businessData.category
            
      const completeBusinessData = businessData
      
      // console.log( completeBusinessData )
      try {
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-type':'application/json',
            crossDomain:true
          },
          body: JSON.stringify(completeBusinessData)
        }).then(response => {
          setIsPending(false)
         
              return response.json()
        } ).then( data => {
          if ( typeof data === 'string' ) {
            setError( data)
          } else {
            setRegistrationStatus(data)
            setError( '' )
            setAccountType('business')
            // console.log(data)
            setAuth( { data: data.user } )
            sessionStorage.setItem( 'userToken', data.accessToken )
            sessionStorage.setItem('userId', data.user.id)
            // alert( 'Registration Successful' );
            navigate('/')
            
          }
         
        //  setRegistrationResponseMessage('Registration Successful')
      })
        
      } catch (error) {
        setError( error )
      }
  
       
      }
    
  return (
    <div className='user-form-cont'>
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