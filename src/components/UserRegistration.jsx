import React, {
 useContext,
 useEffect,
 useState,
} from "react";
import "../css/registration.css";
import RegisterationStatus from "./RegistrationStatus";
import ImageUploading from "react-images-uploading";
import img from "../assets/upload.png";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import img12 from "../assets/loader.gif";
import axios from "axios";

const UserRegistration = () => {
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [phone_number, setPhone] = useState("");
 const [address, setAddress] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [passwordMatch, setPasswordMatch] = useState(true);
 const [registerationResponse, setRegisterationResponse] =
  useState();
 const [data, setData] = useState(null);

 const [formComplete, setFormComplete] = useState(false);
 const [error, setError] = useState("");
 const [isPending, setIspending] = useState(false);
 const user_data = {
  email,
  password,
  first_name,
  last_name,
  phone_number,
  address,
 };

 const maxNumber = 1;
 const [images, setImages] = useState([]);

 const navigate = useNavigate();

 const {
  setAuth,
  auth,
  accountType,
  setAccountType,
  token,
  setToken,
 } = useContext(AuthContext);

 const url =
  "https://api.cloudinary.com/v1_1/dywawv0tg/image/upload";
 const base_url = "http://api.kwaralive.com/v1/user/register";

 // image upload onchange function
 const onChange = (imageList, addUpdateIndex) => {
  setImages(imageList);
  };
  


 //form submit handler

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (images.length > 0){
    var image = images[0].data_url.split(',')[1]
    user_data.image = image
  } else {
   setError("Please Upload your picture");
  }

   setIspending( true );
  //  console.log( user_data );
   setIspending( false );
  try {
   if (password === confirmPassword) {
    setPasswordMatch(true);
     const response = await axios.post( base_url, user_data );
     
    //  console.log( response );
     if ( !response.data.login_details ) {
       setError( response.data.message );
     } else {
       localStorage.setItem("access_token", response.data.login_details.access_token);
       localStorage.setItem("userId", response.data.login_details.id);
       setError( '' );
       navigate( '/', {state: {message: 'Registration Successful!!!'}} );
     }
    setIspending(false);
   } else {
    setPasswordMatch(false);
   }
  } catch (error) {
   setError(error.response.data.message);
   setIspending(false);
   }
   
  //  setIspending(false);
 };

 return (
  <div className="user-form-cont">
   {/* { formComplete && <Alert variant='success'>Registration Successful</Alert>} */}

   {isPending ? (
    <img src={img12} className="signin-loader" alt="" />
   ) : (
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
            src={imageList[0].data_url}
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
       <div className="names">
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
       </div>

       <div className="merged-fields">
        <input
         type="email"
         placeholder="Email"
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
       </div>
       <input
        type="text"
        placeholder="address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        required
       />
       <br />

       <input
        type="password"
        required
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
       />
       <br />
       <input
        type="password"
        required
        placeholder="confirm password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
       />
       <br />
       {user_data.first_name.length > 0 &&
       user_data.last_name.length > 0 &&
       user_data.email.length > 0 &&
       user_data.phone_number.length > 0 &&
       user_data.address.length > 0 &&
       user_data.password.length > 0 &&
       confirmPassword === password &&
       !isPending ? (
        <button className="submit-registration">
         Register
        </button>
       ) : user_data.first_name.length > 0 &&
         user_data.last_name.length > 0 &&
         user_data.email.length > 0 &&
         user_data.phone_number.length > 0 &&
         user_data.address.length > 0 &&
         user_data.password.length > 0 &&
         confirmPassword === password &&
         isPending ? (
        <button disabled className="disabled">
         Registering
        </button>
       ) : (
        <button disabled className="disabled">
         Register
        </button>
       )}

       {/* Error messages */}
       {error?.length > 0 ? (
        <RegisterationStatus status={error} />
       ) : (
        confirmPassword.length > 0 &&
        password !== confirmPassword && (
         <RegisterationStatus
          className="password-match"
          status="passwords do not match"
         />
        )
       )}

       <p className="mt-3 mb-0">
        Already a member? <Link to="/sign-in">Sign In</Link>
       </p>
      </div>
     </div>
    </form>
   )}
  </div>
 );
};

export default UserRegistration;
