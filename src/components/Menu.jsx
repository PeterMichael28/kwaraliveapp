import React, { useState, useEffect } from "react";
import '../css/menu.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { menus } from './datas';

import img12 from '../assets/loader.gif'
import img13 from '../assets/logo.jpg'









const Menu = () => {
    const [categories, setCategories] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [topBusinesses, setTopBusinesses] = useState([])
    const [isFetchingBusinesses, setFetchingBusinesses] = useState(true)

    useEffect(()=>{
        
        fetch('http://localhost:3000/topBusinesses', {headers : {
            crossDomain:true, 
            'Accept': 'application/json'
        }
           })
           .then(response => {
                if(response.ok){
                    return response.json()
                }
            }).then(
                data => {
                    setTopBusinesses(data)
                    setFetchingBusinesses( false )
                    setCategories(data.category)
                   
                    
                })
            
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
                {topBusinesses.map((data)=>(
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
                    <Carousel wrap={true} indicators={false} interval={3000}>
                {topBusinesses.map((business)=>(
                    <Carousel.Item key={business.id}>
                        {
                            business.logo ? <img className='d-block w-400 top-business-logo' src={business.logo} alt=''/> : 
                            <img className='d-block w-400 top-business-logo' src={img13}/>
                        }
                    

                    <Carousel.Caption>
            
                    <Link className='business-names'  to={'/business-details/' + business.id } ><h4>{business.name}</h4></Link>
                        
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel> 
            </div>
    </>
  )
}

export default Menu