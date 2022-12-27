const [email, setEmail] = useState('')
const [ password, setPassword ] = useState( '' )
const [success, setSuccess] = useState(false)
const [selectAccount, setAccount] = useState('')
  const [error, setError] = useState('')
  const [ isPending, setIspending ] = useState( false )
  const [registerationResponse, setRegisterationResponse] = useState([])
const userData = { email, password }

const navigate = useNavigate()

const {setAuth, auth, accountType, setAccountType, token, setToken} = useContext(AuthContext)
  //form submit handler
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    // if ( selectAccount === 'user' ) {
    //   setAccountType( selectAccount )
    //   setAuth({data: {images: 'https://tse4.mm.bing.net/th?id=OIP.V-rXEgNlJT2MObeMatxAOgHaHa&pid=Api&P=0'}})
    //   // console.log('user account')
    // } else {
    //   setAccountType( selectAccount )
    //   setAuth({data: {images: 'https://tse4.mm.bing.net/th?id=OIP.0ku1AvUo__-ohxH4EqTXOAHaEo&pid=Api&P=0'}})
    //   // console.log('business account')
    // }
    // navigate('/')
    
    // console.log(accountType)

    if ( selectAccount === 'user' ) {
      try {
        setIspending(true)
        fetch('https://kwaralive.com/v1/login', {
          method: 'POST',
          headers: {
            'Content-type':'application/json',
            crossDomain: true,
            withCredentials: true
          },
          body: JSON.stringify(userData)
        }).then(response => {
          return response.json()
        } ).then( data => {

          console.log(data)
        
          // if ( typeof data === 'string' ) {
          //   setError( data )
          //   setIspending( false )
          // } else {
          //   setRegisterationResponse( data )
          //   console.log(data)
          //   setError( '' )
          //   setIspending( false )
          //   setAuth( { data: data.user } ); //setting current user
          //   localStorage.setItem(
          //    "userToken",
          //    data.accessToken
          //   );
          //   localStorage.setItem("userId", data.user.id);
          //   // setToken(data.accessToken)
          //   alert( 'Login Successful' );
          //   setAccountType( selectAccount )
            
            navigate('/')
          // }
        
        // console.log(data)
        
      })
      } catch (error) {
        setError(error)
      }
    } else {
      try {
        setIspending(true)
        fetch('https://kwaralive.com/v1/login', {
          method: 'POST',
          headers: {
            'Content-type':'application/json',
            crossDomain: true,
            withCredentials: true
          },
          body: JSON.stringify(userData)
        }).then(response => {
          return response.json()
        } ).then( data => {
        
          // if ( typeof data === 'string' ) {
          //   setError( data )
          //   setIspending( false )
          // } else {
          //   setRegisterationResponse( data )
          //   console.log(data)
          //   setError( '' )
          //   setIspending( false )
          //   setAuth( { data: data.user } ); //setting current user
          //   setToken(data.accessToken)
          //   alert( 'Login Successful' );
          //   setAccountType(selectAccount)
          //   navigate('/')
          // }
        
        console.log(data)
        
      })
      } catch (error) {
        setError( error )
      }
    }
    
    // try {
    //   setIspending(true)
    //   fetch('http://localhost:3000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type':'application/json',
    //       crossDomain: true,
    //       withCredentials: true
    //     },
    //     body: JSON.stringify(userData)
    //   }).then(response => {
    //     return response.json()
    //   } ).then( data => {
      
    //     if ( typeof data === 'string' ) {
    //       setError( data )
    //       setIspending( false )
    //     } else {
    //       setRegisterationResponse( data )
    //       console.log(data)
    //       setError( '' )
    //       setIspending( false )
    //       setAuth( { data: data.user } ) //setting current user
    //       alert( 'Login Successful' );
    //       navigate('/')
    //     }
      
    //   // console.log(data)
      
    // })
    // } catch (error) {
      
    // }

       
          // console.log(userData)
          // setIspending(false)
          
}
  
try {
  setIspending( true );
  fetch('https://kwaralive.com/v1/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      crossDomain: true,
      withCredentials: true
    },
    body: JSON.stringify( userData )
  } ).then( response => {
    return response.json();
  } ).then( data => {

    console.log( data );
    setIspending( false );
  } );
} catch ( error ) {
  setError( error.message );
  console.log( error )
  setIspending( false);
}





fetch( 'http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-type':'application/json',
    crossDomain: true,
    withCredentials: true
  },
  body: JSON.stringify(userData)
}).then(response => {
  return response.json()
  // if(response.ok){
  // }
}).then(data => {

setIspending( false )
if ( typeof data === 'string' ) {
  setError( data );
} else {
  setRegisterationResponse( data );
  setError( '' );
  setAuth( { data: data.user } );
  // setToken( data.accessToken );
  localStorage.setItem(
   "userToken",
   data.accessToken
  );
  localStorage.setItem("userId", data.user.id);
  setAccountType( 'user' );
  // alert( 'Registration Successful' );
  navigate( '/' );
  
  
  // console.log(data)
  // navigate('/sign-in', {state: {success: true}})
} 
// console.log(data)
// console.log(token)
} );

    //business images converted to an array
    // const businessImagesToArray=()=>{
    //     businessImages.forEach((businessImage)=>{
    //       images.push(businessImage.data_url.split(',')[1])
    //     })
  
    //     businessData.image = images
    //     businessData.nature_of_business = businessData.category
        
  
    //     if (businessLogo.length > 0){
    //       // businessData.business_logo = businessLogo[0].data_url.split(',')[1]
    //       businessData.business_logo = businessLogo[0].data_url
    //     }
  
    //     return businessData
    // }

    try {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
          crossDomain:true
        },
        body: JSON.stringify(data)
      }).then(response => {
        setIsPending(false)
       
            return response.json()
      } ).then( data => {
        if ( typeof data === 'string' ) {
          setError( data)
        } else {
          setRegistrationStatus(data)
          setError( '' )
          setAccountType('business')
          // console.log(data)
          setAuth( { data: data.user } )
          localStorage.setItem(
           "userToken",
           data.accessToken
          );
          localStorage.setItem("userId", data.user.id);
          // alert( 'Registration Successful' );
          navigate('/')
          
        }
       
      //  setRegistrationResponseMessage('Registration Successful')
    })
      
    } catch (error) {
      setError( error )
    }





    
    useEffect(() => {
     // console.log(token)

    //  const fetchData = async () => {
    //   await fetch(`http://localhost:3000/600/users/${id}`, {
    //    headers: {
    //     crossDomain: true,
    //     Accept: "application/json",
    //     authorization: `Bearer ${token}`,
    //    },
    //   })
    //    .then((response) => {
    //     // if(response.ok){
    //     return response.json();
    //     // }
    //    })
    //    .then((data) => {
    //     if (typeof data !== "string") {
    //      setuserProfile(data);
    //      setFetching(false);
    //     }
    //    });
    //  };
    //  if (token) {
    //   fetchData();
    //  }
    }, [id, token]);



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

        const onChange = (imageList, addUpdateIndex) => {
          // data for submit
          // console.log(imageList, addUpdateIndex);
          const formData = new FormData();
          formData.append("file", imageList[0].data_url);
          formData.append("upload_preset", "m8ajjegp");
        
          fetch(url, {
           method: "POST",
           body: formData,
          })
           .then((response) => {
            return response.json();
           })
           .then((data) => {
             setData( data.url );
             user_data.image = data.url;
            // console.log(data)
           });
        
          // console.log(data)
        
          setImages(imageList);
};
          

  // useEffect( () => {

  //   // setFetching(true)

  //   const fetchData = async () => {
  //     const res = await axios.get( base_url, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     } )
  //     setAuth( res.data.profile )
  //     console.log(token)
  //     // console.log(res.data.profile)
  //     setFetching(false)
  //   }

  //   if ( token ) {
  //     fetchData();  
  //   }
  //   }, [token])

  useEffect( () => {
    console.log('ook')
  })
