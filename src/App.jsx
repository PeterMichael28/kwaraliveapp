import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
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


function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
     <Route path='/sign-up' element={<SignUp />} />
     <Route path='/search' element={<SearchPage />} />
     <Route path='/sign-up/register_user' element={<UserRegistration />} />
     <Route path='/sign-up/register_business' element={<BusinessRegistration />} />
     <Route path='/sign-up/register-business/complete-registration' element={<CompleteBusinessReg />} />
     <Route path='/sign-in' element={<SignIn />} />
     <Route path='/business-details/:id' element={<BusinessDetails />} />
     <Route path='/user-profile/:id' element={<UserProfile />} />
     <Route path='/business-profile/:id' element={<BusinessProfile />} />
     <Route path='/user-profile/updateuserprofile/:id' element={<UpdateUserProfile />} />
     <Route path='/business-profile/updatebusinessprofile/:id' element={<UpdateBusinessProfile />} />
    </Routes>
  )
}

export default App
