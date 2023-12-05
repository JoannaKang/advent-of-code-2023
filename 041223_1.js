const fs = require("fs");
let input = fs.readFileSync("041223.txt").toString().split("\n");

let answer = 0;

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

  // number of winning number in cardNumbers?
  // iterate cardNumbers -> check if number is in the winningNumbers
  let foundNumber = 0;
  for (let cardIndex = 0; cardIndex < cardNumbers.length; cardIndex++) {
    const currNumber = cardNumbers[cardIndex];
    const isIncludedInWinningNumbers = winningNumbers.includes(currNumber);

    if (isIncludedInWinningNumbers) {
      foundNumber++;
    }
  }
  // score of each card
  // point? 2^(number of winningNumber-1) (power of 2)
  if (foundNumber > 0) {
    const score = Math.pow(2, foundNumber - 1);
    answer += score;
  }
}

// Q. How many points are they worth in total?
console.log(answer);
