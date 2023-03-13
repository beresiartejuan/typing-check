import { useEffect, useState } from "react";

const useText = (url, separator="\n") => {

    const [words, setWords] = useState("");

    const refreshText = () => {
        setWords("");
    };

    useEffect(() => {

        const setRandomWords = async () => {

            if (words !== "") return;

            let all_document = await (await fetch(url)).text();
            let large_phrases = all_document.split(separator);
            // Eligo un fragmento de cuento al azar
            let phrase = large_phrases[Math.floor(Math.random() * large_phrases.length)];

            setWords(phrase);

        }

        setRandomWords().catch(e => console.log(e))

    }, [words, url, separator]);

    return {words, refreshText}

}

export default useText;