const fs = require("fs");
let input = fs.readFileSync("041223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").toString().split("\n");

function getNoOfFoundNumbers(winningNumbers, cardNumbers) {
  let foundNumber = 0;
  for (let cardIndex = 0; cardIndex < cardNumbers.length; cardIndex++) {
    const currNumber = cardNumbers[cardIndex];
    const isIncludedInWinningNumbers = winningNumbers.includes(currNumber);

    if (isIncludedInWinningNumbers) {
      foundNumber++;
    }
  }
  return foundNumber;
}

const result = Array(input.length).fill(1);
for (let i = 0; i < input.length; i++) {
  const card = input[i];
  // before | : winning numbers
  const winningNumbers = card
    .split("|")[0]
    .split(":")[1]
    .split(" ")
    .filter((number) => number);
  // after | : numbers that I have
  const cardNumbers = card
    .split("|")[1]
    .split(" ")
    .filter((number) => number);

  const foundNumbers = getNoOfFoundNumbers(winningNumbers, cardNumbers);

  const noOfCurrentTypeCard = result[i];
  for (let j = 0; j < foundNumbers; j++) {
    result[j + i + 1] += noOfCurrentTypeCard;
  }
}
const sum = result.reduce((a, c) => a + c, 0);
console.log(sum);
