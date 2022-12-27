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
import axios from "axios";




const UserProfile = () => {


    
    // const [auth, setauth] = useState([])
  const [ isFetching, setFetching ] = useState( false)
    const [wallet_id, setWallet] = useState('')
    const { id } = useParams()

    const {setAuth, auth, accountType, setAccountType} = useContext(AuthContext)

  // console.log(auth)
    // console.log( id )
  const token = localStorage.getItem( "access_token" );
  


  const base_url = "http://api.kwaralive.com/v1/user/profile";



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

        { isFetching ? <img src={img6} alt="" className="loader-gif" /> :
          <div className="business-profile-wrapper">
            <div className="upper-card">
              <Link
                to={ `/user-profile/updateuserprofile/${ id }` }
                state={ { auth} }
                className="edit"
              >
                Edit Profile
              </Link>
              <div className="business-logo">
                { auth?.profile_picture === null ? 
                   (
                  <img
                    src={ img1 }
                    onClick={ () => handleImageClick( img1 ) }
                    className="business-logo"
                    alt=""
                  />
                ) :
                  (
                  <Image
                    publicId={ auth?.profile_picture }
                    secure="true"
                    cloud_name="daslnufbd"
                    loading="lazy"
                    onClick={ () =>
                      handleImageClick( auth.profile_picture )
                    }
                  ></Image>
                ) }
              </div>
            </div>

            <div className="lower-card1">
              <div className="profile-details">
                <div className="span">
                  <h3 className="owners-name">
                    { auth?.name }
                  </h3>
                </div>
                <div className="address-email-wrapper">
                  <div className="address-wrapper">
                    <img className="location" src={ img4 } alt="" />
                    <p>{ auth?.phone_number }</p>
                  </div>
                  <div className="email-wrapper">
                    <img className="email" src={ img3 } alt="" />
                    <p>{ auth?.email }</p>
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
                children={ auth?.address }
              />
            </div>
          </div>
        }
     </div>
    );
}

export default UserProfile