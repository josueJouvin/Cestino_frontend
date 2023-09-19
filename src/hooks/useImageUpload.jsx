import { useState } from "react"
import alertToast from "../utilities/alertToast";

const useImageUpload = () => {
  const [preImage, setPreImage] = useState(null)
  const [image, setImage] = useState(null)

  function handleImageUpload(e){
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')){
      return alertToast({type:"error", msg:"El Archivo o Formato no es el correcto"})
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreImage(reader.result)
    };
    reader.readAsDataURL(file);

    if (file.size > 10 * 1024 * 1024) {
      return alertToast({type: "error", msg: "La imagen debe ser de menos de 10MB" });
    }
    
    setImage(file)
  }

  function deletedImage(e){
    e.preventDefault()
    setImage(null)
    setPreImage(null)
  }

  return {preImage, image, setPreImage, setImage, handleImageUpload, deletedImage}
}

export default useImageUpload

