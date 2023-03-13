import { useCallback, useEffect, useState, useMemo } from 'react';
import useText from './helpers/useText';
import useTimer from "./helpers/useTimer.js";
import useTyping from './helpers/useTyping.js';
import useChecker from './helpers/useChecker';
import useResults from './helpers/useResults';

export default function useEngine(){

    const [status, setStatus] = useState("ready");

    const default_time = 60;

    const finalMessages = useMemo(() => ({
        "finished": {
            "styles": "text-red-500 font-bold text-lg",
            "message": "¡El tiempo se ha agotado! :("
        },
        "overclock": {
            "styles": "text-green-500 font-bold text-lg",
            "message": "¡Terminaste antes de tiempo! :D"
        }
    }), []);

    const { stopCount, startCount, hasTimerEnded, time }  = useTimer(default_time);
    const text = useText("phrases.txt");
    const typing = useTyping(status === "running", text.words.length);
    const checker = useChecker(text.words, typing.typed, typing.cursor);
    const {results, calcResults} = useResults(checker.textChecked);
    
    const startHanlder = useCallback(() => {
        if(status === "ready"){
            startCount();
            setStatus("running");
        }
    }, [status, startCount]);

    const overclockHandler = useCallback(() => {
        if(text.words.length - 1 <= typing.cursor && status === "running"){
            stopCount();
            setStatus("overclock");
            calcResults(default_time - time);
        }
    }, [text, typing, stopCount, setStatus, status, calcResults, time, default_time]);

    useEffect(() => {

        if(hasTimerEnded){
            setStatus("finished");
            calcResults(default_time);
        }

        overclockHandler();

    }, [hasTimerEnded, overclockHandler, calcResults, default_time]);

    useEffect(() => {

        document.addEventListener("keydown", startHanlder);

        return () =>
            document.removeEventListener("keydown", startHanlder);

    }, [startHanlder]);

    return {
        time, 
        status, 
        textChecked: checker.textChecked, 
        results, 
        finalMessages 
    }

}