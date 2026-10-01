import { useState, useCallback } from "react";

const buildInitialResults = () => ({
    errors: 0,
    success: 0,
    extra: 0,
    total: 0,
    cpm: 0,
});

const useResults = (words) => {

    const [results, setResults] = useState(buildInitialResults);

    const calcResults = useCallback((time) => {

        setResults((prevResults) => {

            if (prevResults.cpm !== 0) return prevResults;

            const summary = words.reduce(
                (acc, char) => {
                    acc.total += 1;

                    if (!char.wasHere && !char.isHere) {
                        acc.extra += 1;
                        return acc;
                    }

                    if (char.isCorrect) {
                        acc.success += 1;
                    } else {
                        acc.errors += 1;
                    }

                    return acc;
                },
                { errors: 0, success: 0, extra: 0, total: 0 }
            );

            const hitCharacters = summary.success + summary.errors;

            return {
                ...summary,
                cpm: time > 0 ? Math.floor((60 * hitCharacters) / time) : 0,
            };

        });

    }, [words]);

    return { results, calcResults };

};

export default useResults;