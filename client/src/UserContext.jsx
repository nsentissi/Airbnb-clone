import { createContext, useEffect, useState } from "react"
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    useEffect( () => {
        if (!user) {
           const {data} = axios.get('/profile').then(({data})=> {
            setUser(data)
            setLoading(true)
           });
           setUser(data)
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, loading}}>
        {children}
        </UserContext.Provider>
    );
};