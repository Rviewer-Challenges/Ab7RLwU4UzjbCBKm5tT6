import { useState } from "react";
import Game from "./components/Game/index.jsx";
import Difficulty from "./components/Difficulty/index.jsx";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState();

  const setDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="container">
      {gameStarted ? (
        <Game reset={() => resetGame()} difficulty={selectedDifficulty} />

      ) : (
        <Difficulty setDifficulty={(difficulty) => setDifficulty(difficulty)} />
      )}
    </div>
  );
}

export default App;
