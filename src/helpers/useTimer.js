import { useCallback, useRef, useState, useEffect } from "react";

const useTimer = (number = 60, limit = 0) => {

    const [time, setTime] = useState(number);
    const timer = useRef(null);
    const isRunning = timer.current !== null;
    const hasTimerEnded = time <= limit;

    const startCount = useCallback(() => {

        if(!isRunning && !hasTimerEnded){

            timer.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000)

        }

    }, [timer, setTime, hasTimerEnded, isRunning]);

    const stopCount = useCallback(() => {
        clearInterval(timer.current);
        timer.current = null;
    }, [timer]);

    const resetCount = useCallback(() => {
        stopCount();
        setTime(number);
        startCount();
    }, [startCount, stopCount, setTime, number]);

    useEffect(() => {

        if(hasTimerEnded) stopCount();

        return () => stopCount();

    }, [hasTimerEnded, stopCount]);

    useEffect(() => {
        return () => {
            clearInterval(timer.current)
            timer.current = null;
        };
    }, []);

    return { time, stopCount, startCount, resetCount, limit, isRunning, timerRef: timer, hasTimerEnded };

}








/*
const useTimer = ({ number = 30 }) => {

    const [timeLeft, setTimeLeft] = useState(number);
    const intervalRef = useRef(null);
    const hasTimerEnded = timeLeft <= 0;
    const isRunning = intervalRef.current !== null;

    const startCountdown = useCallback(() => {
        if (!hasTimerEnded && !isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
            }, 1000)
        }
    }, [setTimeLeft, hasTimerEnded, isRunning])

    const resetCountdown = useCallback(() => {
        clearInterval(intervalRef?.current)
        intervalRef.current = null;
        setTimeLeft(number);
    }, [number])

    useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [hasTimerEnded]);

    // clear interval when component unmounts
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return { timeLeft, startCountdown, resetCountdown, hasTimerEnded, isRunning }

}
*/
export default useTimer;