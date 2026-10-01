export default function GeneratedText({ words = [{}], className = "" }) {
    return (
        <div className={`text-gray-400 text-2xl text-center max-w-xl ${className}`}>
            {words.map((char, index) => (
                <Char char={char} key={index} />
            ))}
        </div>
    );
}

const CHAR_STYLES = {
    correct: "text-green-500",
    incorrect: "text-red-500",
    correctSpace: "bg-green-400",
    incorrectSpace: "bg-red-400",
};

function Char({ char }) {

    let className = "";

    if (char.isHere) {
        className += "border-l-2 border-solid border-white ";
    }

    if (char.wasHere) {
        const spaceClass = char.isCorrect ? CHAR_STYLES.correctSpace : CHAR_STYLES.incorrectSpace;
        const charClass = char.isCorrect ? CHAR_STYLES.correct : CHAR_STYLES.incorrect;
        className += (char.character === " ") ? spaceClass : charClass;
    }

    return (
        <span className={className}>
            {char.character}
        </span>
    );
}