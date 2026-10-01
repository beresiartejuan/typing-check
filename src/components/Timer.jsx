const getTimerColor = (timeLeft) => {
    if (timeLeft > 40) return "text-green-500";
    if (timeLeft > 20) return "text-yellow-500";
    return "text-red-500";
};

export default function Timer({ time, totalTime = 60, className = "" }) {

    return (
        <h2 className={`${getTimerColor(time)} font-medium ${className}`}>
            Tiempo: {time} segundos.
        </h2>
    );

}