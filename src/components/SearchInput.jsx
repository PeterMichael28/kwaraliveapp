
import React, { useEffect, useState } from 'react';
import SearchCard from './SearchCard';
import img13 from '../assets/search.png'

const SearchInput = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [datas, setDatas] = useState([]);
    const [searching, setSearching] = useState(false)
    

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        setSearching( true )
        console.log(query)
        fetch('http://localhost:3000/topBusinesses',{
            method: 'GET',
            headers:{
                'Content-type':'application/json',
                crossDomain:true       
            }
        }).then(response => {
           
                return response.json()
        }).then(data =>{
            
            // if ( data.length > 0 ) {
            //     setDatas(data.filter((dat) => dat.includes(query.toLowerCase())))
            //     datas.length > 0 ? setResult(datas) : setResult(['no result'])
            // }

            const res = data.filter( ( dat ) => dat.name.toLowerCase().includes( query.toLowerCase() ) )
            console.log(res)

            console.log( data )
            if ( res.length > 0 ) {
                setResult(res)
                
            } else {
                setResult(['no result'])
            }
        
            setSearching(false)
            setQuery('')
        
        } )

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
            (result.length > 0 && result[0] !== 'no result') ?
             
             <p className='search-counter'>{result.length} search results found for {query}</p>

             :

             (result.length > 0 && result[0] === 'no result') && <p className='search-counter'>no search results found for {query}</p>

    

             
        }
    </div>
    
    
    <SearchCard businesses={result} query={query} searching={searching}/>
    
</div>
  )
}

export default SearchInput