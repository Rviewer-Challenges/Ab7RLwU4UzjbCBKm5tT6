const generateRandomNumbers = (total, count) => {
  const randomNumbers = [];

  while (randomNumbers.length < total / count) {
    const randomNumber = Math.floor(Math.random() * (1000 - 1)) + 1;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};

export { generateRandomNumbers };
