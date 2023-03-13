import { useState, useCallback } from "react";

const useResults = (words) => {

    const [results, setResults] = useState({
        "errors": 0,
        "success": 0,
        "extra": 0,
        "total": 0,
        "cpm": 0
    });

    const calcResults = useCallback((time) => {

        if(results.cpm !== 0) return;

        console.log("Se calcularon resultados")

        words.forEach(char => {

            setResults(prevResults => ({
                ...prevResults, total: prevResults.total + 1
            }))

            if(!char.wasHere && !char.isHere){
                setResults(prevResults => ({
                    ...prevResults, extra: prevResults.extra + 1
                }));
                return;
            }

            if(char.isCorrect){

                setResults(prevResults => ({
                    ...prevResults, success: prevResults.success + 1
                }));
                return;

            }else{

                setResults(prevResults => ({
                    ...prevResults, errors: prevResults.errors + 1
                }));
                return;

            }

        });

        setResults(prevResults => ({
            ...prevResults, cpm: Math.floor((60 * (prevResults.errors + prevResults.success))/time)
        }));

    }, [words, setResults, results]);

    return {
        results, calcResults
    }

};

export default useResults;