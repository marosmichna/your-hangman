
type HangmanWordProps = {
    guessLetters: string[]
    guessWord: string
    reveal?: boolean
    isDarkMode: boolean
};

export const HangmanWord = ({ guessLetters, guessWord, reveal = false, isDarkMode }: HangmanWordProps) => {


    return(
        <div style={{
            display: "flex",
            gap: "0.25em",
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace"
        }}>
           {guessWord.split("").map((letter, index) => (
            <span style={{ borderBottom: isDarkMode ? "0.1em solid white" : "0.1em solid black" }} key={index}>
                <span style={{
                        visibility: guessLetters.includes(letter) || reveal
                            ? "visible"
                            : "hidden",
                        color: !guessLetters.includes(letter) && reveal 
                            ? "red"
                            : isDarkMode ? "white" : "black"
                    }}
                >
                    {letter}
                </span>
            </span>
           ))} 
        </div>
    )
};