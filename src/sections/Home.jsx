import React, { useContext, useEffect } from 'react'
import Menu from '../components/Menu';
import CoverPage from '../components/CoverPage';
import AuthContext from '../store/AuthContext';


const Home = () => {

  const {setAuth, auth, accountType, setAccountType, token, setToken} = useContext(AuthContext)





  return (
      <div>
          <CoverPage />
          <Menu />
    </div>
  )
}

export default Home