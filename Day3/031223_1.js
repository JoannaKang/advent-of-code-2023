const fs = require("fs");
let input = fs.readFileSync("031223.txt").toString().split("\n");

const width = input[0].length;
const height = input.length;

// What is the sum of all of the part numbers in the engine schematic?
let parsedStrings = [];
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (!isNaN(input[y][x])) {
      let foundNumbers = [];
      let foundX = x;
      let foundY = y;
      while (true) {
        foundNumbers.push(input[y][x]);
        x++;
        if (isNaN(input[y][x])) {
          break;
        }
        if (x === input[y].length) {
          break;
        }
      }
      const foundString = {
        number: foundNumbers,
        coordinate: [foundX, foundY],
      };
      parsedStrings.push(foundString);
    }
  }
}

let answer = 0;
for (let i = 0; i < parsedStrings.length; i++) {
  const number = parsedStrings[i].number;
  for (let j = 0; j < number.length; j++) {
    const x = parsedStrings[i].coordinate[0] + j;
    const y = parsedStrings[i].coordinate[1];

    let foundSymbol = false;

    // check current value is not in the far left
    if (x > 0) {
      const c = input[y][x - 1];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    // check left above diagonal side
    if (x > 0 && y > 0) {
      const c = input[y - 1][x - 1];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    // check above
    if (y > 0) {
      const c = input[y - 1][x];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    // check right above diagonal side
    if (y > 0 && x < width - 1) {
      const c = input[y - 1][x + 1];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    // check right side
    if (x < width - 1) {
      const c = input[y][x + 1];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    // check right down diagonal side
    if (y < height - 1 && x < width - 1) {
      const c = input[y + 1][x + 1];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }
    //  check below
    if (y < height - 1) {
      const c = input[y + 1][x];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    // check left below diagonal side
    if (y < height - 1 && x > 0) {
      const c = input[y + 1][x - 1];
      foundSymbol = foundSymbol || (isNaN(c) && c !== ".");
    }

    if (foundSymbol) {
      const result = number.join("");
      answer += Number(result);
      break;
    }
  }
}

console.log(answer);
