import { useState, useEffect, createContext } from "react";
import { useNavigate} from "react-router-dom";
import axiosCustomer from "../config/axios";


const AuthContext = createContext()
const AuthProvider = ({children}) => {
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
                const { data } = await axiosCustomer("/vendedor/profile", config)
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

    async function updateProfile(profile) {
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
            const url = `/vendedor/profile/${profile._id}`
            const {data} = await axiosCustomer.put(url, profile, config) 
            return{
                msg: "Almacenado Correctamente",
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
      
    }

    async function savePassword(password) {
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
            const url = "/vendedor/update-password"
            const {data} = await axiosCustomer.put(url, password, config)
            return{
                msg: data.msg
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }
    return(
        <AuthContext.Provider value={{auth, setAuth, loading, logOut, updateProfile, savePassword}}>
            {children}
        </AuthContext.Provider>
    )
} 

export{
    AuthContext,
    AuthProvider
}