import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/businessDetails.css'
import { FaStar } from 'react-icons/fa';
import ReactMarkdown from "react-markdown";
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import img1 from '../assets/logo.jpg';
import img2 from '../assets/verified.png';
import img3 from '../assets/email.png';
import img4 from '../assets/location2.png';
import img5 from '../assets/no-image.png';
import img6 from '../assets/loader.gif';
import Back from "../components/Back";

const BusinessProfile = () => {


    
    const [businessProfile, setBusinessProfile] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [wallet_id, setWallet] = useState('')
    const { id } = useParams()

    console.log( id )
    
    const token =  sessionStorage.getItem( 'userToken' )

    useEffect( () => {
        
        const fetchData = async () => {

            await fetch( `http://localhost:3000/600/users/${id}`, {
                headers: {
                    crossDomain: true,
                    'Accept': 'application/json',
                    authorization: `Bearer ${token}`
                }
            } )
               .then(response => {
                    // if(response.ok){
                        return response.json()
                    // }
                }).then(
                    data => {
                       
                        if ( typeof data !== 'string' ) {
                            setBusinessProfile(data)
                            setFetching(false)
                          }
               
                    } )

    //                 await fetch(`${prod}/v1/get-wallet-details?owner_id=${id.slice(5,20)}`, {headers : {
    //                     crossDomain:true, 
    //                     'Accept': 'application/json'
    //                 }
    //                     })
    //                     .then(response => {
    //                         if(response.ok){
    //                             return response.json()
    //                         }
    //                     }).then(
    //                         data => {
    //                             setWallet(data.wallet_details.wallet_id)
    //                             console.log(wallet_id)
    //                             setFetching(false)                 
    //                         })
            
        }

        if ( token ) {
            
            fetchData()
        }

               
            
    }, [id, token])


      //setting image modal click event
    const handleImageClick=(src)=>{
        var modal = document.getElementById('modal-for-image')
        var image = document.querySelector('.image-in-modal')

        image.src = src 
        modal.style.display = 'block'
    }



  return (
    <div className='business-profile-bg'>
          <Back />

          {/* modal for images */}
        <div id='modal-for-image'>
                    <button className='closer' onClick={()=>{document.getElementById('modal-for-image').style.display='none'}}>&times;</button>
                    <Image className='image-in-modal'></Image>
            </div>


            {

                !isFetching ? 

                <div className='business-profile-wrapper'>
                      <div className='upper-card'>
                      <button className="edit">Edit Profile</button>
                            <div className='business-logo'>
                                {   businessProfile.logo ? 
                                    <Image
                    
                                        publicId={businessProfile.logo}
                                        secure='true'
                                        cloud_name='daslnufbd' 
                                        loading='lazy'
                                        onClick={()=>handleImageClick(businessProfile.logo)}
                                        
                                        >
                                        
                                    </Image> : 
                                    <img src={img1} className='business-logo' alt='' onClick={()=>handleImageClick(img1)}/>
                                }
                            </div>
                            {/* <div className='wallet-id'>
                                <p>Wallet ID : </p>
                                <p> 123</p>
                            </div>
                                                         */}
                    </div>

                    <div className='lower-card1'>
                        <div className='verification-status'>{businessProfile.verification_status == 'verified' ? <img src = {img2} alt=''/>: <p></p>}</div>
                        <div className='profile-details'>
                            <div className='span'>
                                <h3 className='owners-name'>{businessProfile.business_name}</h3>
                                <h5 className='owners-name'>{businessProfile.first_name + ' ' + businessProfile.last_name }</h5>
                                <p className='business-profile-categories'>{businessProfile.category}</p>
                            </div>
                            <div className='address-email-wrapper'>
                                <div className='address-wrapper'><img className='location' src={img4} alt=''/><p>{businessProfile.address}</p></div>
                                <div className='email-wrapper'><img className='email' src={img3} alt=''/><p>{businessProfile.email}</p></div>
                            </div>
                                    
                        </div>
                    </div>

                    <div className='lower-card2'>
                        <h5 className='business-description-header'>Business Description</h5>
                           
                            
                            {/*<p><ReadMoreReact className='business-profile-description' text={businessProfile.business_description}/></p>*/}
                            <ReactMarkdown className='business-profile-description' children={businessProfile.business_description}/>
                                  
                                
                        
                    </div>


                    <div className='lower-card4'>
                        <h5 className='business-images-header'>Business Images</h5>
                        <div className='business-profile-images'>
                            {
                                businessProfile.image.length > 0 ? businessProfile.image.map((image, i)=>(
                                    <div className='business-profile-image' key={i}>
                                            <Image
                            
                                            publicId={image}
                                            secure='true'
                                            cloud_name='daslnufbd' 
                                            loading='lazy'
                                            className = 'img'
                                            // onClick={()=>handleImageClick(image)}
                                     >
                                            
                                        </Image>
                                    </div>
                                )) : <img className='no-images' src={img5} alt=''/>
                                    
                            }
                        </div>
                        
                    </div>
                </div> :  <div className='loader-wraper-bg'><img className ='loader-gif' src ={img6} alt=''/></div>

                


                }
                
        </div>
  )
}

export default BusinessProfile