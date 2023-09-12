import { useState } from "react"
import alertToast from "../utilities/alertToast";

const useImageUpload = () => {
  const [preImage, setPreImage] = useState(null)
  const [image, setImage] = useState(null)

  function handleImageUpload(e){
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')){
      alertToast({tipe:"error", msg:"El archivo no es el correcto"})
      return;
    }
    setImage(file)

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreImage(reader.result)
    };
    reader.readAsDataURL(file);
  }

  function deletedImage(e){
    e.preventDefault()
    setImage(null)
    setPreImage(null)
  }

  return {preImage, image, setPreImage, setImage, handleImageUpload, deletedImage}
}

export default useImageUpload