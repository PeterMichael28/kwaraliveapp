import React from 'react'
import Back from '../components/Back';
import SearchInput from '../components/SearchInput';
import '../css/search.css'

const SearchPage = () => {
  return (
    <div className='search-container'>
    <Back />
    <SearchInput />
  </div>
  )
}

export default SearchPage