import "./App.css";
import { useState, useEffect, useCallback } from "react";
import words from "./wordListEn.json";
import { HangmanBody } from "./components/HangmanBody";
import { HangmanWord } from "./components/HangmanWord";
import { HangmanKeyboard } from "./components/HangmanKeyboard";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./components/firebase";
import Modal from 'react-modal';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface HangmanDocument {
  id?: string;
  word?: string;
}

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function App() {

  const [data, setData] = useState<HangmanDocument[]>([]);

  const [guessWord, setGuessWord] = useState(getWord);
  const [guessLetters, setGuessLetters] = useState<string []>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [openModal, setOpenModal] = useState(false);

  console.log(guessWord)
  console.log(data)
  const wordsCollectionRef = collection(db, "hangman");

  const incorrectLetters = guessLetters.filter(
    letter => !guessWord.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = guessWord
    .split("")
    .every(letter => guessLetters.includes(letter));
  
  const addGuessLetter = useCallback((letter: string) => {
    if(guessLetters.includes(letter) || isLoser || isWinner) return;

    setGuessLetters(currentLetters => [...currentLetters, letter]);
  }, [guessLetters, isWinner, isLoser]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const createWord = async () => {
    const lowercaseWord = newWord.toLowerCase();
    await addDoc(wordsCollectionRef, {word: lowercaseWord});
    setOpenModal(false);
  };

  useEffect (() => {
    const getWords = async () => {
      const myData = await getDocs(wordsCollectionRef);
      setData(myData.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getWords();
  }, []);


  useEffect(() => {

    if(!openModal) {

    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if(!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessLetter(key);

    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    };
  }
  }, [guessLetters, addGuessLetter, openModal]);


  useEffect(() => {

    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if(key !== "Enter") return;

      e.preventDefault();
      setGuessLetters([]);

      if(isLoser) {
        setGuessWord(getWord)
      } 

      if(isWinner && data) {
        console.log(data)
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setGuessLetters([]);
        if (randomWord && randomWord.word) {
          console.log("-----" + randomWord.word)
          setGuessWord(randomWord.word);
        }
        // setGuessWord(data[Math.floor(Math.random() * data.length)].word);
        setOpenModal(true);
      }  
      
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler)
    };

  }, [data, isWinner, isLoser]);

 
  return (
    <div className={`${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
          padding: "10px 0"
        }}
      >
        <button 
          onClick={toggleDarkMode}
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            border: "none",
            background: "none"
          }}
        >
          {isDarkMode 
            ? <LightbulbIcon style={{color: "white", boxShadow: "2px 2px 5px 5px white" }} /> 
            : <LightbulbIcon style={{ boxShadow: "2px 2px 5px 5px black" }}  />}
        </button>
        <div
          style={{ 
            fontSize: "2rem", 
            textAlign: "center",
            color: isDarkMode ? "white" : "black" 
          }}
        >
          {isWinner && "Winner :-) - Please press Enter to try again"}
          {isLoser && "Nice Try :-) - Please press Enter to try again"}
        </div>
        <HangmanBody 
          isDarkMode={isDarkMode} 
          numberOfGuess={incorrectLetters.length} 
        />
        <HangmanWord 
          guessLetters={guessLetters} 
          guessWord={guessWord} 
          reveal={isLoser}
          isDarkMode={isDarkMode}
        />
        <div style={{ alignSelf: "stretch" }}>
          <HangmanKeyboard
            disabled={isLoser || isWinner} 
            activeLetters={guessLetters.filter(letter => 
              guessWord.includes(letter) 
            )}
            inactiveLetters={incorrectLetters} 
            addGuessLetter={addGuessLetter}
            isDarkMode={isDarkMode}
          />
        </div>
        <Modal
          isOpen={openModal}
          
          style={{
            content: {
              position: 'absolute',
              top: '180px',
              left: '180px',
              right: '180px',
              bottom: '180px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
          <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
          >
            <h2>Hangman</h2>
            <button 
              onClick={() => setOpenModal(false)}
              style={{
                cursor: "pointer",
                border: "none",
                background: "white",
                fontWeight: "bold"
              }}
            >
              Close
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems:  "center"
            }}
          >
            <h1>You won !!!</h1>
            <p
              style={{
                width: "80%",
                fontSize: "20px",
              }}
            >
              It's fantastic. You just proved that you are a great player. 
              As a sign of this, you can add the word to the database for other players.
            </p>
          </div>
          <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20
            }}
          >
            <input 
              type="text"
              placeholder="YouR Word"
              onChange={(e) => {setNewWord(e.target.value)}}
              style={{
                padding: "5px 10px",
                outline: "none",
              }}
            />
            <button 
              onClick={createWord}
              className="modal-btn"
            >
              Create Word
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems:  "center"
            }}
          >
            <p>
              Before adding a word, 
              please check carefully whether the word is written grammatically correctly. 
              Thank you very much :-).
            </p>
            <h3>Please be careful</h3>
            <p>
              Please use only polite words.
              (For example: Cities, Animals, Things you use every day...)
              Be considerate of other players. Thank you very much :-).
            </p>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default App
