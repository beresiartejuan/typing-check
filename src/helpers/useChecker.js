const useChecker = (original_text = "", user_input = "", cursor) => {

    const original_characters = original_text.split("");
    const user_characters = user_input.split("");

    const textChecked = original_characters.map((original_char, index) => (
        {
            isHere: index === cursor,
            wasHere: index < cursor,
            isCorrect: original_char === user_characters[index],
            character: original_char
        })
    );

    return { textChecked };

};

export default useChecker;