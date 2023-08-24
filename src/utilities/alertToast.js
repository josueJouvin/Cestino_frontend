import { toast } from "react-toastify";

const alertToast = ({tipe, msg}) =>{
    toast[tipe](msg, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",    
      });
}

export default alertToast