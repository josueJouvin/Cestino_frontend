import { useState, useEffect, createContext } from "react";
import { useNavigate} from "react-router-dom";
import axiosCustomer from "../config/axios";


const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [ auth, setAuth ] = useState({})
    
    useEffect(() => {
        const authUser = async () =>{
            const token = localStorage.getItem('token')
            if(!token){
                setLoading(false)
                return  
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosCustomer("/vendedor/perfil", config)
                setAuth(data)
            } catch (error) {
               console.log(error.response.data.msg) 
               setAuth({})
            }
            setLoading(false)
        }
        authUser()
    }, [])

    function logOut() {
        localStorage.removeItem('token')
        setAuth({})
    }

    return(
        <AuthContext.Provider value={{auth, setAuth, loading, logOut}}>
            {children}
        </AuthContext.Provider>
    )
} 

export{
    AuthContext,
    AuthProvider
}