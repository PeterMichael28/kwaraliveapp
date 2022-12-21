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

const UpdateUserProfile = () => {
 // const [userProfile, setuserProfile] = useState([])

 const location = useLocation();
 const userProfile = location.state.userProfile;
 const [first_name, setFirstName] = useState(
  userProfile.first_name
 );
 const [last_name, setLastName] = useState(
  userProfile.last_name
 );
 const [email, setEmail] = useState(userProfile.email);
 const [phone_number, setPhone] = useState(
  userProfile.phone_number
 );
 const [images, setImages] = useState(userProfile.image);
 const [address, setAddress] = useState(
  userProfile.address
 );
 const userData = {
  email,
  first_name,
  last_name,
  phone_number,
  address,
  images,
 };
 const [error, setError] = useState("");
 const [data, setData] = useState(null);
 const [isPending, setIspending] = useState(false);

 const [isFetching, setFetching] = useState(false);
 const [wallet_id, setWallet] = useState("");
 const { id } = useParams();

 const { setAuth, auth, accountType, setAccountType } =
  useContext(AuthContext);

 const url =
  "https://api.cloudinary.com/v1_1/dywawv0tg/image/upload";

 // console.log( id )
 const token = localStorage.getItem("userToken");

 const maxNumber = 1;

 const navigate = useNavigate();

 // image upload onchange function

 //form submit handler

 // useEffect( () => {
 //   // console.log(token)

 //   const fetchData = async () => {

 //       await fetch( `http://localhost:3000/600/users/${id}`,
 //        {   method: 'PATCH',
 //           headers: {
 //               crossDomain: true,
 //               'Accept': 'application/json',
 //               authorization: `Bearer ${token}`
 //           }
 //       } )
 //          .then(response => {
 //               // if(response.ok){
 //                   return response.json()
 //               // }
 //          } ).then( data => {

 //           if ( typeof data !== 'string' ) {
 //               setuserProfile(data)

 //             // setFirstName( userProfile.first_name )
 //             setLastName( userProfile.last_name )
 //             setEmail( userProfile.email )
 //             setPhone( userProfile.phone_number )
 //             setAddress( userProfile.address )

 //             setFetching( false )
 //             // console.log(data)
 //             }

 //               } )

 //   }
 //   if ( token ) {

 //       fetchData()
 //   }

 // }, [isFetching] )

 const onChange = (imageList, addUpdateIndex) => {
  // data for submit
  // console.log(imageList, addUpdateIndex);

  const formData = new FormData();
  formData.append("file", imageList[0].data_url);
  formData.append("upload_preset", "m8ajjegp");

  fetch(url, {
   method: "POST",
   body: formData,
  })
   .then((response) => {
    return response.json();
   })
   .then((data) => {
    setData(data.url);
    setImages(data.url);
    // console.log(data)
   });
 };

 const handleSubmit = (e) => {
  e.preventDefault();

  // if (images.length > 0){
  //   // let image = images[0].data_url.split(',')[1]
  //   userData.image = data
  // } else {
  //   setError('Please Upload your picture')
  // }

  try {

      setIspending(true)
      fetch( `http://localhost:3000/600/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type':'application/json',
          crossDomain: true,
          withCredentials: true,
          authorization: `Bearer ${token}`
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
        // setRegisterationResponse( data )
        setError( '' );
        // setAuth( { data: data.user } )
        // setAccountType('user')
        // alert( 'Registration Successful' );
        navigate( `/user-profile/${id}` );
      }
    })
  } catch (error) {
    setError( error.message)
    // console.log(error)
  }

  console.log(userData);
 };

 return (
  <div className="user-form-cont">
   {/* { formComplete && <Alert variant='success'>Registration Successful</Alert>} */}

   {!isFetching ? (
    <form className="user-reg-form" onSubmit={handleSubmit}>
     {/* image uploader */}
     <ImageUploading
      multiple={false}
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
     >
      {({ imageList, onImageUpload }) => (
       // write your building UI
       <div className="upload__image-wrapper">
        <div className="picture-cont">
         {images?.length > 0 ? (
          <>
           <img
            onClick={() => {
             setImages([]);
             return onImageUpload();
            }}
            className="profile-picture"
            src={images}
            alt=""
            width="100"
           />
          </>
         ) : (
          <img
           onClick={() => {
            setImages([]);
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
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={first_name}
        required
       />
       <br />
       <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={last_name}
        id="last-name"
        required
       />
       <br />
       {/* </div> */}

       {/* <div className='merged-fields'>  */}
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
       />
       <br />
       {/* </div> */}
       <input
        type="text"
        placeholder="address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        required
       />
       <br />

       {(userData.first_name?.length > 0 &&
       userData.first_name !== userProfile.first_name) ||
       (userData.last_name?.length > 0 &&
       userData.last_name !== userProfile.last_name) ||
       (userData.phone_number?.length > 0 &&
       userData.phone_number !== userProfile.phone_number) ||
       (userData.address?.length > 0 &&
       userData.address !== userProfile.address) &&
       !isPending ? (
        <button className="submit-registration">
         Update Profile
        </button>
       ) : userData.first_name?.length > 0 &&
         userData.first_name !== userProfile.first_name &&
         userData.last_name?.length > 0 &&
         userData.last_name !== userProfile.last_name &&
         userData.phone_number?.length > 0 &&
         userData.phone_number !==
          userProfile.phone_number &&
         userData.address?.length > 0 &&
         userData.address !== userProfile.address &&
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