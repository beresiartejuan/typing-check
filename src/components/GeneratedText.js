"text-red-500"; "bg-red-400"; "text-green-500"; "bg-green-400";
// TODO: Aprender a cargar los estilos sin hacer lo de arriba :p

export default function GeneratedText({ words = [{}], className="" }) {

    return (<div className={`text-gray-400 text-2xl text-center max-w-xl ${className}`}>
        {words.map((char, index) => (<Char char={char} key={index}></Char>))}
    </div>)

}

function Char({ char, key }) {

    let className = "";

    className += char.isHere ? "border-l-2 border-solid border-white" : "";

    if(char.wasHere){
        // Le da estilo dependiendo de que sea un caracter o un espacio en blanco
        let color = (char.isCorrect) ? "green" : "red";
        className += (char.character === " ") ? `bg-${color}-400` : `text-${color}-500`;
    }

    return (
        <span
            key={key}
            className={className}
        >
            {char.character}
        </span>
    )

}