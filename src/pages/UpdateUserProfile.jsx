import React, { useContext, useEffect, useState } from 'react';
import '../css/registration.css';
import RegisterationStatus from '../components/RegistrationStatus';
import ImageUploading from 'react-images-uploading';
import img from '../assets/upload.png'
import {
 Link,
 useLocation,
 useNavigate,
 useParams,
} from "react-router-dom";
import { Alert } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import img6 from "../assets/loader.gif";
import axios from 'axios';
import Back from '../components/Back';

const UpdateUserProfile = () => {
 // const [userProfile, setuserProfile] = useState([])

 const location = useLocation();
  const userProfile = location.state.auth;
  


 const [full_name, setFullName] = useState(
  userProfile.name
 );
 const [email, setEmail] = useState(userProfile.email);
 const [phone_number, setPhone] = useState(
  userProfile.phone_number
 );
 const [image, setImage] = useState(userProfile?.profile_picture);
 const [images, setImages] = useState([]);
 const [address, setAddress] = useState(
  userProfile.address
 );
 const user_data = {
  email,
  full_name,
  phone_number,
  address,
  image,
 };
 const [error, setError] = useState("");
 const [data, setData] = useState(null);
 const [isPending, setIspending] = useState(false);

 const [isFetching, setFetching] = useState(false);
 const [wallet_id, setWallet] = useState("");
 const { id } = useParams();

 const { setAuth, auth, accountType, setAccountType } =
  useContext(AuthContext);

 const maxNumber = 1;

  const navigate = useNavigate();

  const token = localStorage.getItem( "access_token" );
  
  const base_url = "http://api.kwaralive.com/v1/user/profile/update";


  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImage(imageList);  
    
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
   setFetching( true )

   if (image?.length > 0){
    const img = image[0].data_url.split(',')[1]
    user_data.image = img
  } else {
   setError("Please Upload your picture");
   }
   
   try {
     const response = await axios.post( base_url, user_data, {
      headers: {
        'Authorization': `Bearer ${token}`
       }
      });
    //  console.log( response )
     setError('')
     setFetching( false )
     navigate('/')
   } catch (error) {
    //  console.log( error.response.data.msg )
     setError(error.response.data.msg)
     setFetching( false )
   }
   
  //  console.log(user_data)
  //  setFetching( false)
 };

 return (
  <div className="user-form-cont">
     {/* { formComplete && <Alert variant='success'>Registration Successful</Alert>} */ }
     
     <Back />

   {!isFetching ? (
    <form className="user-reg-form" onSubmit={handleSubmit}>
     {/* image uploader */}
     <ImageUploading
      multiple={false}
      value={image}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
     >
      {({ imageList, onImageUpload }) => (
       // write your building UI
       <div className="upload__image-wrapper">
        <div className="picture-cont">
         {image?.length > 0 ? (
          <>
           <img
            onClick={() => {
             setImage([]);
             return onImageUpload();
            }}
            className="profile-picture"
            src={imageList[0].data_url}
            alt=""
            width="100"
           />
          </>
         ) : (
          <img
           onClick={() => {
            setImage([]);
            return onImageUpload();
           }}
           className="avatar"
           src={img}
           alt=""
          />
         )}
        </div>
       </div>
      )}
     </ImageUploading>

     <div className="cont-input-triangle">
      <div className="triangle"></div>
      <div className="inputs">
       {/* <div className='names'>  */}
       <input
        type="text"
        name="first"
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
        value={full_name}
        required
        className='mb-4'
       />
       <input
        type="email"
        placeholder="Email"
        disabled
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
       />
       <br />
       <input
        type="text"
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
        id="phone"
        value={phone_number}
        required
        className='ms-0'
       />
       <br />
       
       <input
        type="text"
        placeholder="address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        required
       />
       <br />

       {(user_data.full_name?.length > 0 &&
       user_data.full_name !== userProfile.name) ||
       (user_data.phone_number?.length > 0 &&
       user_data.phone_number !== userProfile.phone_number) ||
       (user_data.address?.length > 0 && user_data.address !== userProfile.address) ||
        (user_data.image?.length > 0 &&
          user_data.image !== userProfile.profile_picture) &&
       !isPending ? (
        <button className="submit-registration">
         Update Profile
        </button>
       ) : user_data.full_name?.length > 0 &&
         user_data.full_name !== userProfile.full_name &&
         (user_data.image?.length > 0 &&
          user_data.image !== userProfile.profile_picture) &&
         user_data.phone_number?.length > 0 &&
         user_data.phone_number !==
          userProfile.phone_number &&
         user_data.address?.length > 0 &&
         user_data.address !== userProfile.address &&
         isPending ? (
        <button disabled className="disabled">
         Updating Profile
        </button>
       ) : (
        <button disabled className="disabled">
         Update Profile
        </button>
       )}

       {/* Error messages */}
       {error.length > 0 && (
        <RegisterationStatus status={error} />
       )}
      </div>
     </div>
    </form>
   ) : (
    <div className="loader-wraper-bg">
     <img className="loader-gif" src={img6} alt="" />
    </div>
   )}
  </div>
 );
};

export default UpdateUserProfile