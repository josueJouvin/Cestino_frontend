import { useEffect } from "react";

const useKeyboard = ({closeForm, handleSubmit}) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            
            if (e.key === "Enter") {
                handleSubmit(e);
            }
            
            if (e.key === "Escape") {
                closeForm();
            }
        }
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [closeForm, handleSubmit]);
}

export default useKeyboard