import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ children: modalContent }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }

}

export default Modal;