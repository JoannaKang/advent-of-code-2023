const fs = require("fs");

let input = fs.readFileSync("021223.txt").toString().split("\n");

// const restriction = ["12 red, 13 green, 14 blue"];

// Q.
// Determine which games would have been possible
// if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
// What is the sum of the IDs of those games?
const restriction = { red: 12, green: 13, blue: 14 };
// A.
// filter the games out if record contains more than max number of cubes
const parsedInput = input.map((item) => {
  const gameName = Number(item.split(":")[0].split(" ")[1]);
  const record = item
    .split(":")[1]
    .split(";")
    .map((subRecord) => {
      const trimedSubRecord = subRecord
        .trim()
        .split(",")
        .map((record) => {
          const objKey = record.trim().split(" ")[1];
          const objValue = record.trim().split(" ")[0];
          return { [objKey]: objValue };
        });

      return trimedSubRecord;
    });
  return { gameName, record };
});

function isPossible(item) {
  const restriction = { red: 12, green: 13, blue: 14 };
  const key = Object.keys(item)[0];
  const value = Object.values(item)[0];

  // return true when value parameter is less than restriction's value
  return value <= restriction[key] ? true : false;
}
let result = 0;

for (let gameIndex = 0; gameIndex < parsedInput.length; gameIndex++) {
  let flag = true;
  for (
    let gameSetIndex = 0;
    gameSetIndex < parsedInput[gameIndex].record.length;
    gameSetIndex++
  ) {
    // iterate each game set
    for (
      let gameBallIndex = 0;
      gameBallIndex < parsedInput[gameIndex].record[gameSetIndex].length;
      gameBallIndex++
    ) {
      const gameSet =
        parsedInput[gameIndex].record[gameSetIndex][gameBallIndex];
      flag = flag && isPossible(gameSet);
    }
  }
  if (flag) {
    result += parsedInput[gameIndex].gameName;
  }
}

// get the sum of the possible game IDs
// console.log(result);

// Q2.
let answer = 0;
for (let gameIndex = 0; gameIndex < parsedInput.length; gameIndex++) {
  let maxGameSet = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (
    let gameSetIndex = 0;
    gameSetIndex < parsedInput[gameIndex].record.length;
    gameSetIndex++
  ) {
    // iterate each game set
    for (
      let gameBallIndex = 0;
      gameBallIndex < parsedInput[gameIndex].record[gameSetIndex].length;
      gameBallIndex++
    ) {
      const gameSet =
        parsedInput[gameIndex].record[gameSetIndex][gameBallIndex];

      const colour = Object.keys(gameSet)[0];
      const value = Number(Object.values(gameSet)[0]);
      if (maxGameSet[colour] < value) {
        maxGameSet[colour] = value;
      }
    }
  }
  const result = maxGameSet["red"] * maxGameSet["green"] * maxGameSet["blue"];
  answer += result;
}

console.log(answer);
