const fs = require("fs");
let input = fs.readFileSync("061223.txt").toString().split("\n");

const time = parseInt(
  input[0]
    .split(":")[1]
    .trim()
    .split("    ")
    .map((str) => str.trim())
    .join("")
);
const maxDistance = parseInt(
  input[1]
    .split(":")[1]
    .trim()
    .split("   ")
    .map((str) => str.trim())
    .join("")
);

const winRecords = [];
let numberOfWins = 0;
for (let pushDuration = 0; pushDuration < time; pushDuration++) {
  const moveTime = time - pushDuration;
  const totalDistance = pushDuration * moveTime;
  if (totalDistance > maxDistance) {
    numberOfWins++;
  }
}
winRecords.push(numberOfWins);

const res = winRecords.reduce((a, c) => a * c, 1);
console.log(res);
