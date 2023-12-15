import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from 'prop-types';

import Card from "./Card";

import { fetchApiData } from "../../utils/services/apiCall";
import { generateRandomNumbers } from "../../utils/services/randomNumbers";
import { shuffleArray } from "../../utils/services/shuffleArray";

import useTimer from "../../utils/hooks/useTimer";
import useOrientation from "../../utils/hooks/useOrientation";

import "./styles.css";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const DEFAULT_INITIAL_TIME = 60;
const DEFAULT_FLIP_TIMEOUT = 1000;
const MAX_CARDS = 2;

function Game({ reset, difficulty: { rows, columns, label } }) {
  const TOTAL_CARDS = rows * columns;

  const [moves, setMoves] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [orientation, setOrientation] = useState('');
  const [cardsContent, setCardsContent] = useState([]);

  const cardRefs = useRef([]);
  useOrientation(setOrientation);
  const { time } = useTimer(DEFAULT_INITIAL_TIME, DEFAULT_FLIP_TIMEOUT, matchedCards.length === TOTAL_CARDS / MAX_CARDS);

  const fetchData = useCallback(async () => {
    try {
      const randomNumbers = generateRandomNumbers(TOTAL_CARDS, MAX_CARDS);
      let promises = randomNumbers.map((number) =>
        fetchApiData(`${API_BASE_URL}${number}`)
      );

      const newCardsContent = await Promise.all(promises);

      const formattedCardsContent = newCardsContent.map((data) => ({
        id: data.id,
        image: data.sprites?.front_default,
      }));

      const shuffledArray = shuffleArray([...formattedCardsContent]);
      setCardsContent([...shuffledArray, ...shuffledArray]);
    } catch (error) {
      console.error(`Error durante la llamada a la API: ${error.message}`);
    }
  }, [TOTAL_CARDS, setCardsContent]);

  useEffect(() => {
    if (cardsContent.length === 0) {
      fetchData();
    }
  }, [cardsContent.length, fetchData]);

  const handleCardClick = (cardKey, cardValue) => {
    if (
      selectedCards.some((e) => e.key === cardKey) ||
      matchedCards.includes(cardValue) ||
      selectedCards.length === MAX_CARDS
    ) {
      return;
    } else {
      let updatedSelectedCards = [...selectedCards];

      var currentCard = cardRefs.current[cardKey];
      if (currentCard) {
        currentCard.classList.add("card-rotated");

        if (updatedSelectedCards.length < MAX_CARDS) {
          updatedSelectedCards.push({ key: cardKey, id: cardValue });
          setSelectedCards(updatedSelectedCards);
        }

        if (updatedSelectedCards.length === MAX_CARDS) {
          setMoves((prevMoves) => prevMoves + 1);
          const [firstCard, secondCard] = updatedSelectedCards;

          const areCardsMatching =
            firstCard && secondCard && firstCard.id === secondCard.id;

          if (areCardsMatching) {
            const updatedMatchedCards = [...matchedCards, firstCard.id];
            setMatchedCards(updatedMatchedCards);
            setSelectedCards([]);
          } else {
            setTimeout(() => {
              var firstCardRef = cardRefs.current[firstCard.key];
              var secondCardRef = cardRefs.current[secondCard.key];

              if (firstCardRef && secondCardRef) {
                firstCardRef.classList.remove("card-rotated");
                secondCardRef.classList.remove("card-rotated");
                setSelectedCards([]);
              }
            }, DEFAULT_FLIP_TIMEOUT);
          }
        }
      }
    }
  };

  const cards = cardsContent?.map(({ id, image }, index) => (
    <Card
      key={index}
      index={index}
      image={image}
      id={id}
      disabled={time === 0}
      onClick={time > 0 ? handleCardClick : () => { }}
      cardRef={(ref) => (cardRefs.current[index] = ref)}
    />
  ));

  return (
    <div className="game-board-container">
      <button onClick={() => reset()}>Return to Level Selection</button>
      <div className="display">
        <div>
          <strong>Time:</strong>
          <h3 id="difficultyTag">{time}s</h3>
        </div>
        <div>
          <strong>Difficulty:</strong>
          <span id="difficultyTag">{label}</span>
        </div>
        <div>
          <strong>Moves:</strong>
          <span id="movesTag">{moves}</span>
        </div>
        <div>
          <strong>Remaining Pairs:</strong>
          <span id="remaining_pairsTag">{TOTAL_CARDS / MAX_CARDS - matchedCards.length}</span>
        </div>
        <div>
          <strong>Orientation:</strong>
          <span id="orientationTag">{orientation}</span>
        </div>
      </div>
      {matchedCards.length === TOTAL_CARDS / MAX_CARDS && (
        <h2>🤩 YOU WIN 🤩</h2>
      )}
      {matchedCards.length !== TOTAL_CARDS / MAX_CARDS && time <= 0 && (
        <h2>😵 YOU LOST 😵</h2>
      )}
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${orientation === "landscape" ? columns : rows}, 1fr)`,
        }}
      >
        {cards}
      </div>
      <div>
        <h6>By Nacho Cebey</h6>
      </div>
    </div>
  );
}

Game.propTypes = {
  reset: PropTypes.func,
  difficulty: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default Game;
