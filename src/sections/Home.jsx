import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu';
import CoverPage from '../components/CoverPage';
import AuthContext from '../store/AuthContext';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { useLocation } from 'react-router-dom';
import AlertMsg from '../components/AlertMsg';


const Home = () => {

  const { setAuth, auth, accountType, setAccountType, setToken } = useContext( AuthContext );

  const [ alert, setAlert ] = useState( true );
  
  const token = localStorage.getItem( "access_token" );
  const userId = localStorage.getItem( "userId" );

  const base_url = "http://api.kwaralive.com/v1/user/profile";

  const location = useLocation();
  const message = location.state?.message;

  // console.log(alert)


  useEffect( () => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      const res = await axios.get( base_url, {
        headers: {
          'Authorization': `Bearer ${ token }`
        }
      } );
      setAuth( res.data.profile );
      // console.log(res.data.profile)
    };

    if ( token ) {
      fetchData();
    }

    return () => controller.abort();
  }, [ token ] );
  
  useEffect( () => {

   const alertTimeout = setTimeout( () => {
      setAlert( false );
    }, 3000 )
    

    return () => clearTimeout(alertTimeout)
    
  }, [message])



  return (
    <div>
        { ( message && alert ) ? <div className='alert-box'>
        <Alert variant='success'>
          {message}
        </Alert>
    </div>  : <div className='' style={{display: 'none'}}>
        <Alert variant='success'>
          {message}
        </Alert>
        </div> }
        {/* <Alert variant='success'>
          This is a alert—check it out!
        </Alert> */}
          <CoverPage />
          <Menu />
    </div>
  )
}

export default Home