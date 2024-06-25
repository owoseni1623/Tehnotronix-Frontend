import { useState } from "react"

function useAlert() {
    const [alertInfo, setalertInfo] = useState({
        show: false,
        type: null,
        message: "",
    });

    const showAndHide = (type, message) => {
        setalertInfo({ show: true, type, message});

        setTimeout(() => {
            setalertInfo((prev) => ({ ...prev, show: false}));
        },5000);
    };
    
  return {alertInfo, showAndHide};
  
}

export default useAlert;