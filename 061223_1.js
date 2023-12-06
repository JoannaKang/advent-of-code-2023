const fs = require("fs");
let input = fs.readFileSync("061223.txt").toString().split("\n");

const time = input[0].split(":")[1].trim().split("    ").map(Number);
const maxDistance = input[1].split(":")[1].trim().split("   ").map(Number);

// To guarantee you win the grand prize,
// you need to make sure you go farther in each race than the current record holder.

// Holding down the button charges the boat, and releasing the button allows the boat to move.

// Determine the number of ways you could beat the record in each race.
// What do you get if you multiply these numbers together?

const winRecords = [];
for (let i = 0; i < time.length; i++) {
  let numberOfWins = 0;
  const totalTime = time[i];
  for (let pushDuration = 0; pushDuration < totalTime; pushDuration++) {
    const moveTime = totalTime - pushDuration;
    const totalDistance = pushDuration * moveTime;
    if (totalDistance > maxDistance[i]) {
      numberOfWins++;
    }
  }
  winRecords.push(numberOfWins);
}

const res = winRecords.reduce((a, c) => a * c, 1);
console.log(res);
