import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Home from '../sections/Home';
import AuthContext from '../store/AuthContext';

const Homepage = () => {
  const { auth } = useContext( AuthContext )
 

 


  
  
  return (
      <div>
        <Nav />
      <Home />
      <Footer /> 
    </div>
  )
}

export default Homepage