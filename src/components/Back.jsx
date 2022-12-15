import React from 'react'
import {BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Back = () => {

    const navigate = useNavigate()
  return (
      <div><BsArrowLeft className='' style={ {
          fontSize: '2rem',
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          cursor: 'pointer'
      } } onClick={() => navigate(-1)} /></div>
  )
}

export default Back