import { useState, useEffect, createContext } from "react";
import axiosCustomer from "../config/axios";
import { useNavigate } from "react-router-dom";
import { configJsonHeaders } from "../helpers/configJsonHeaders";

const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [ auth, setAuth ] = useState({})
    
    useEffect(() => {
        const authUser = async () =>{
            const config = await configJsonHeaders(setLoading)
            
            try {
                const { data } = await axiosCustomer("/vendedor/profile", config)
                setAuth(data)
                navigate("/admin")
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
        const config = await configJsonHeaders(setLoading)

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
        const config = await configJsonHeaders(setLoading)
    
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