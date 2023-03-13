import { useRef } from "react";
import { MdRefresh } from "react-icons/md"

export default function RestartButton({
    onRestart = () => { window.location.reload() },
    className = ""
}) {

    const buttonRef = useRef(null);

    const hanlder = () => {
        buttonRef.current?.blur()
        onRestart();
    }

    return (<button
        onClick={hanlder}
        ref={buttonRef}
        className={`block rounded px-8 py-2 hover:bg-gray-900/40 ${className}`}
    ><MdRefresh className="w-6 h-6"></MdRefresh></button>)

}