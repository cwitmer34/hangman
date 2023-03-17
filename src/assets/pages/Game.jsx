import { useEffect, useState } from "react";

const Game = () => {
  // list of keys i want the user to be able to press
  const keys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ];
  const [guessesLeft, setGuessesLeft] = useState(11);
  const [movie, setMovie] = useState({});
  const [word, setWord] = useState(" ");
  const [underlinedWord, setUnderlinedWord] = useState("");
  const [guess, setGuess] = useState("guess");
  // *FIGURE OUT LATER: allow keypresses for guesses
  // const handleKeyPress = (e) => {

  // };
  useEffect(() => {
    setGuessesLeft(guessesLeft - 1);
  }, [guess]);

  // Virtual Keyboard
  const displayKeys = keys.map((key, i) => {
    const insertLineBreak = ["0", "p", "l"].indexOf(key) !== -1;
    console.log(key);
    if (insertLineBreak)
      return (
        <>
          <button onClick={() => setGuess(key)} className="key">
            {key}
          </button>
          <br />
        </>
      );
    return (
      <button onClick={() => setGuess(key)} className="key">
        {key}
      </button>
    );
  });

  // API Call
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${Math.round(
          Math.random() * 996
        )}?api_key=8a24b2d959ceee3bccf1f1c53489cba7&language=en`,
        { mode: "cors" }
      );
      const jsonData = await data.json();
      if (jsonData.success === "false") fetchData();
      console.log(jsonData);
      setMovie(jsonData);
      setWord(jsonData.title);
      setUnderlinedWord("_ ".repeat(word.length - 1) + "_");
    };
    fetchData();
  }, []);

  // Game Display
  return (
    <div className="container">
      <h1>hangman</h1>
      <p>{word}</p>
      <p>{guessesLeft}</p>
      <p>{guess}</p>
      <div className="key-container">{displayKeys}</div>
    </div>
  );
};

export default Game;
