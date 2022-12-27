import React, { useState, useEffect } from "react";
import '../css/menu.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { menus } from './datas';

import img12 from '../assets/loader.gif'
import img13 from '../assets/logo.jpg'

import axios from "axios";







const Menu = () => {
    const [categories, setCategories] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [topBusinesses, setTopBusinesses] = useState([])
    const [ isFetchingBusinesses, setFetchingBusinesses ] = useState( false )
    
    const base_url = "http://api.kwaralive.com/v1/business/top-100";

    useEffect( () => {
        
        setFetchingBusinesses( true )
        const fetchData = async () => {


            try {
                const res = await axios.get( base_url );
                setTopBusinesses( res.data.top_100 );
                // console.log(res.data.top_100)
                setFetchingBusinesses( false );
            } catch ( error ) {
                // console.log( error );
                setFetchingBusinesses( false );
            }
        }
        
        fetchData()
            
    }, [] )
    // console.log(topBusinesses)
    


  return (
    <>
        <div className='heading'>
            <h2>POPULAR RIGHT NOW</h2>
            <hr className='divider'/>
        </div>
      
      
        <main className='main'>
                    <div className='menu-list'>
                    {menus.map((menu)=>(
                        <div key={menu.id}>         
                                <div  className='activities'>
                                    <Link to={menu.link}><img className='menu-images'  src = {menu.icon} alt=''/></Link>
                                    <Link to={menu.link} className='menu-title'>{menu.menu}</Link>
                                </div>
                            
                        </div>
                    ))}
                </div>
      </main>
      
      <div className='heading'>
            <h2>TOP CATEGORIES FOR YOU</h2>
            <hr className='divider'/>
          </div>
          
          {!isFetchingBusinesses ?  
            <div className='category-wrapper'>
                {topBusinesses.slice(1, 20).map((data)=>(
                    <div key={data.id} className='categories'>
                        <p>{data.category}</p>
                    </div>
                ))}
            </div> :<div className='loader-wraper'><img className ='loader' src ={img12} /></div>}
      
      {/* <p className='text-center mt-5 display-5'>Coming Soon .....</p> */ }
      {/* <div className='loader-wraper'><img className ='loader' src ={img12} /></div> */}

      <div className='heading'>
            <h2>TOP BUSINESSES FOR YOU</h2>
        <hr className='divider' />
      </div>

      {/* <p className='text-center mt-5 display-5'>Coming Soon .....</p> */}
      {/* <div className='loader-wraper'><img className='loader' src={ img12 } /></div> */}
      
      <div className='top-businesses'>
                    <Carousel wrap={true} indicators={false} interval={3000} fade>
                {topBusinesses.map((business)=>(
                    <Carousel.Item key={business.id}>
                        {
                            business.logo ? <img className='d-block w-400 top-business-logo' src={business.logo} alt=''/> : 
                            <img className='d-block w-400 top-business-logo' src={img13}/>
                        }
                    

                    <Carousel.Caption>
            
                    <Link className='business-names'  to={'/business-details/' + business.id} state={{business}} ><h4>{business.business_name}</h4></Link>
                        
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel> 
            </div>
    </>
  )
}

export default Menu