
import React, { useEffect, useState } from 'react';
import SearchCard from './SearchCard';
import img13 from '../assets/search.png'
import axios from 'axios';

const SearchInput = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [ searching, setSearching ] = useState( false )
    
    

    const handleSubmit=async (e)=>{
        e.preventDefault()
        
        setSearching( true )

        try {
            const res = await axios.get( `http://api.kwaralive.com/v1/business/search?search=${ query }` )
            
            if ( res.data.search_result.length > 0 ) {
                
                setResult( res.data.search_result )
            } else {
                setResult( [ 'no result' ] )
            }
            setSearching( false )
        } catch (error) {
            console.log(error)
            setSearching( false )
        }
    }


  return (
    <div className='main-cont'>
    <div className='form-cont'>
        <h2 className='search-heading'>FIND A BUSINESS TODAY</h2>

        <form onSubmit={handleSubmit} className='search-form'>
            <input
            type='text'
            required 
            value={query}
            onChange = {(e)=>setQuery(e.target.value)} 
            className='search-input px-3'
            placeholder='Search For Businesses'
            />
            <button><img className='search-button' src={img13} alt=''/></button>
        </form>

        {
            (result?.length > 0 && result[0] !== 'no result') ?
             
             <p className='search-counter'>{result.length} search results found for {query}</p>

             :

             (result?.length > 0 && result[0] === 'no result') && <p className='search-counter'>no search results found for {query}</p>

    

             
        }
    </div>
    
    
    <SearchCard businesses={result} query={query} searching={searching}/>
    
</div>
  )
}

export default SearchInput