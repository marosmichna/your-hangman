import styles from "./HangmanKeyboard.module.css"

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

type HangmanKeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    disabled: boolean
    isDarkMode: boolean
    addGuessLetter: (letter: string) => void
}

export const HangmanKeyboard = ({ activeLetters, inactiveLetters, disabled=false, isDarkMode, addGuessLetter }: HangmanKeyboardProps) => {
    return(
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: "0.5rem",
            }}
        >
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return (
                    <button 
                        className={` 
                            ${styles.btn} 
                            ${isActive ? styles.active : ""}
                            ${isInactive ? styles.inactive : ""}
                            ${isDarkMode ? styles.dark : styles.light}        
                        `} 
                        key={key}
                        onClick={() => addGuessLetter(key)}
                        disabled={isActive || isInactive || disabled}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
};