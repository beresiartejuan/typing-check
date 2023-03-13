import { useState, useEffect } from "react"

export default function Timer({ timeLeft }) {

    const [originalTime, setOriginalTime] = useState(0);
    const [aux, setAux] = useState(true);

    useEffect(() => {

        if(aux){
            setOriginalTime(timeLeft);
            setAux(false);
        }

    }, [aux, timeLeft])

    let color = (time) => {
        if(originalTime === 0) return "text-gray-500";
        if(Math.floor( originalTime / 2 ) < time) return "text-green-500";
        if(Math.floor( originalTime / 2 ) >= time && Math.floor( originalTime / 3 ) <= time ) return "text-yellow-500";
        return "text-red-500";
    }

    return (<h2 className={`${color(timeLeft)} font-medium`}>Tiempo: {timeLeft} segundos.</h2>);

}