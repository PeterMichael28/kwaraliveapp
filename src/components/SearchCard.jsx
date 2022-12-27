import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import img13 from '../assets/logo.jpg'
import img12 from '../assets/loader.gif'
import { Image  } from 'cloudinary-react';

const SearchCard = ({businesses, query, searching}) => {
  return (
    <div className='search-result-container'>
            
    {(!searching > 0 && businesses[0] !== 'no result') ?  
    
    <div>
        {/*businesses.length > 0 && <p className='search-counter'>{businesses.length} search results found for {query}</p>*/}
        <div className='search-cont'>
        {
                businesses?.map((business)=>(
                    <main className='each-search-cont' key={business.id}>
                        <div  className='business-search-container'>
                            <div className='average-rating'>
                                    <p className='rating-value'>{business.average_rating}</p>
                                    <FaStar className='star'/>
                            </div>
                            
                            {business.logo ? <Image
                                     className='business-logo'
                                     publicId={business.logo}
                                     secure='true'
                                     cloud_name='daslnufbd' 
                                     loading='lazy'
                                     > 
                                      </Image> : <img src={img13} className='business-logo' alt='loading..'/>}
                            <Link to={'/business-details/' + business.id} state={{business}} className='business-name'>{
                            
                            business.business_name.length < 18 ?

                            business.business_name

                            :

                            business.business_name.slice(0,18) + '...'
                            
                            }</Link>
                            
                            
                        </div>
                    </main>
                    
                    ))
            }
        </div>
            
    </div>
     :
     
     (businesses[0] === 'no result') ?
     <></>
     :
     <div className='loader-wraper' id='search-loader'><img className ='loader' src ={img12} alt=''/></div>
}
</div>
    
  )
}

export default SearchCard