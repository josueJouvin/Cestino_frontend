import { toast } from "react-toastify";

const alertToast = ({type, msg}) =>{
    toast[type](msg, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",    
      });
}

export default alertToast