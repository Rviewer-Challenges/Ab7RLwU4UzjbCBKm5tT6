import PropTypes from 'prop-types';
import './styles.css';

const difficultyLevels = [
  { label: "easy", rows: 4, columns: 4 },
  { label: "medium", rows: 4, columns: 6 },
  { label: "hard", rows: 5, columns: 6 },
];

function Difficulty({ setDifficulty = () => {} }) {
  const handleSetDifficulty = (level) => {
    setDifficulty(level);
  };

  return (
    <div className='difficulty-container'>
      <h1>Select your difficulty:</h1>
      <div className='buttons-container'>
        {difficultyLevels.map((level, index) => (
          <button
            key={index}
            className='difficulty-button'
            onClick={() => handleSetDifficulty(level)}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}

Difficulty.propTypes = {
  setDifficulty: PropTypes.func,
};

export default Difficulty;
