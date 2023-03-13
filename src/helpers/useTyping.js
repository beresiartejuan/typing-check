import { useCallback, useEffect, useRef, useState } from "react";

export const isKeyboardCodeAllowed = (code = "") => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space" ||
        code === "Period" ||
        code === "Comma" ||
        code === "Slash" ||
        code === "Semicolon"
    );
};

const useTyping = (enabled = false, limit) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState("");
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        ({ key, code }) => {
            if (!enabled || !isKeyboardCodeAllowed(code)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    setTyped((prev) => prev.length === 0 ? prev : prev.slice(0, -1));
                    setCursor((cursor) => cursor === 0 ? cursor : cursor - 1);
                    totalTyped.current -= 1;
                    break;
                default:
                    setTyped((prev) => (prev.length >= limit) ? prev : prev.concat(key));
                    setCursor((cursor) => (cursor >= limit) ? cursor : cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [enabled, limit]
    );

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    // attach the keydown event listener to record keystrokes
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    return {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
};

export default useTyping;