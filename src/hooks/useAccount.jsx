import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useValidation from "./useValidation"
import axiosCustomer from "../config/axios"

const useAccount = () =>{
    const {alert, setAlert} = useValidation()
    const [confirmedAccount, setConfirmedAccount] = useState(false)
    const [loading, setLoading] = useState(true)
    const params = useParams()
  
    useEffect(() => { 
      const confirmAccoutn = async () =>{
        try {
          const url = `/vendedor/confirmar/${params.id}`
          const {data} = await axiosCustomer(url)
          setConfirmedAccount(true)
          setAlert({msg: data.msg})
        } catch (error) {
          setAlert({msg:error.response.data.msg, error: true})
        }
  
        setLoading(false)
      }
      confirmAccoutn()
    }, [])
  
    return {alert,confirmedAccount,loading}
  }

export default useAccount