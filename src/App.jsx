import { useContext, useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes,  useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import UserRegistration from './components/UserRegistration';
import BusinessRegistration from './components/BusinessRegistration';
import CompleteBusinessReg from './components/CompleteBusinessReg';
import SearchPage from './pages/SearchPage';
import SignIn from './pages/SignIn';
import BusinessDetails from './pages/BusinessDetails';
import UserProfile from './pages/UserProfile';
import BusinessProfile from './pages/BusinessProfile';
import UpdateUserProfile from './pages/UpdateUserProfile';
import UpdateBusinessProfile from './pages/updateBusinessProfile';
import AuthContext from './store/AuthContext';
import axios from "axios";


function App() {

  const { setAuth, auth, accountType, setAccountType, setToken } = useContext( AuthContext )
  
  const token = localStorage.getItem( "access_token" );
  const userId = localStorage.getItem( "userId" );

  const base_url = "http://api.kwaralive.com/v1/user/profile";

  const navigate = useNavigate()


  useEffect( () => {
    const fetchData = async () => {
      const res = await axios.get( base_url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } )
      setAuth( res.data.profile )
      navigate('/')
      
      // console.log(res.data.profile)
    }

    if ( token ) {
      fetchData();  
    }

  }, [ token ] )
  

  
  const currentUser = auth;
const RequireAuth = ({children}) => {
  return auth ? children : <Navigate to='/sign-in' />
  
}

  

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
     <Route path='/sign-up' element={<SignUp />} />
     <Route path='/search' element={<SearchPage />} />
     <Route path='/sign-up/register_user' element={<UserRegistration />} />
     <Route path='/sign-up/register_business' element={<BusinessRegistration />} />
     <Route path='/sign-up/register-business/complete-registration' element={<CompleteBusinessReg />} />
     <Route path='/sign-in' element={<SignIn />} />
     <Route path='/business-details/:id' element={<RequireAuth><BusinessDetails /></RequireAuth>} />
     <Route path='/user-profile/:id' element={<RequireAuth><UserProfile /></RequireAuth>} />
     <Route path='/business-profile/:id' element={<RequireAuth><BusinessProfile /></RequireAuth>} />
     <Route path='/user-profile/updateuserprofile/:id' element={<RequireAuth><UpdateUserProfile /></RequireAuth>} />
     <Route path='/business-profile/updatebusinessprofile/:id' element={<RequireAuth><UpdateBusinessProfile /></RequireAuth>} />
    </Routes>
  )
}

export default App
