import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import '../css/businessDetails.css'
import { FaStar } from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import img1 from '../assets/logo.jpg';
import img2 from '../assets/verified.png';
import img3 from '../assets/email.png';
import img4 from '../assets/call.png';
import img5 from '../assets/no-image.png';
import img6 from '../assets/loader.gif';
import Back from "../components/Back";
import AuthContext from "../store/AuthContext";




const UserProfile = () => {


    
    const [userProfile, setuserProfile] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [wallet_id, setWallet] = useState('')
    const { id } = useParams()

    const {setAuth, auth, accountType, setAccountType} = useContext(AuthContext)

    // console.log( id )
    const token = localStorage.getItem("userToken");

    // useEffect( () => {

    //         setToken( localStorage.getItem( 'userToken' ) )
    //         console.log('access', token)

    // }, [])

    useEffect(() => {
     // console.log(token)

     const fetchData = async () => {
      await fetch(`http://localhost:3000/600/users/${id}`, {
       headers: {
        crossDomain: true,
        Accept: "application/json",
        authorization: `Bearer ${token}`,
       },
      })
       .then((response) => {
        // if(response.ok){
        return response.json();
        // }
       })
       .then((data) => {
        if (typeof data !== "string") {
         setuserProfile(data);
         setFetching(false);
        }
       });
     };
     if (token) {
      fetchData();
     }
    }, [id, token]);

    //setting image modal click event
    const handleImageClick = (src) => {
     var modal = document.getElementById("modal-for-image");
     var image = document.querySelector(".image-in-modal");

     image.src = src;
     modal.style.display = "block";
    };

    return (
     <div className="business-profile-bg">
      <Back />

      {/* modal for images */}
      <div id="modal-for-image">
       <button
        className="closer"
        onClick={() => {
         document.getElementById(
          "modal-for-image"
         ).style.display = "none";
        }}
       >
        &times;
       </button>
       <Image className="image-in-modal"></Image>
      </div>

      {!isFetching ? (
       <div className="business-profile-wrapper">
        <div className="upper-card">
         <Link
          to={`/user-profile/updateuserprofile/${id}`}
          state={{ userProfile: userProfile, id: id }}
          className="edit"
         >
          Edit Profile
         </Link>
         <div className="business-logo">
          {userProfile.image ? (
           <Image
            publicId={userProfile?.image}
            secure="true"
            cloud_name="daslnufbd"
            loading="lazy"
            onClick={() =>
             handleImageClick(userProfile.image)
            }
           ></Image>
          ) : (
           <img
            src={img1}
            onClick={() => handleImageClick(img1)}
            className="business-logo"
            alt=""
           />
          )}
         </div>
        </div>

        <div className="lower-card1">
         <div className="profile-details">
          <div className="span">
           <h3 className="owners-name">
            {userProfile?.first_name +
             " " +
             userProfile?.last_name}
           </h3>
          </div>
          <div className="address-email-wrapper">
           <div className="address-wrapper">
            <img className="location" src={img4} alt="" />
            <p>{userProfile?.phone_number}</p>
           </div>
           <div className="email-wrapper">
            <img className="email" src={img3} alt="" />
            <p>{userProfile?.email}</p>
           </div>
          </div>
         </div>
        </div>

        <div className="lower-card2">
         <h5 className="business-description-header">
          Address
         </h5>
         <ReactMarkdown
          className="business-profile-description"
          children={userProfile?.address}
         />
        </div>
       </div>
      ) : (
       <div className="loader-wraper-bg">
        <img className="loader-gif" src={img6} alt="" />
       </div>
      )}
     </div>
    );
}

export default UserProfile