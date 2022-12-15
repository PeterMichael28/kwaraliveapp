import { createContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthContextProvider = ( { children } ) => {


    
    const [ auth, setAuth ] = useState( null )
    const [ accountType, setAccountType ] = useState( null )
    const [ token, setToken ] = useState( null )
    

   
    return (
        <AuthContext.Provider value={ { auth, setAuth, accountType, setAccountType, token, setToken } } >
            {children}
        </AuthContext.Provider >
    );
}

export default AuthContext;