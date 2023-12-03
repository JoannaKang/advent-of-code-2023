const fs = require("fs");
let input = fs.readFileSync("031223.txt").toString().split("\n");

const width = input[0].length;
const height = input.length;

// What is the sum of all of the gear ratios in your engine schematic?
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

let gears = {};

for (let i = 0; i < parsedStrings.length; i++) {
  const number = parsedStrings[i].number;
  function checkGear(xCoord, yCoord) {
    const c = input[yCoord][xCoord];
    if (c === "*") {
      const key = [yCoord, xCoord];
      if (!gears[key]) {
        gears[key] = {};
      }
      gears[key][number] = null;

      return true;
    } else {
      return false;
    }
  }
  for (let j = 0; j < number.length; j++) {
    const x = parsedStrings[i].coordinate[0] + j;
    const y = parsedStrings[i].coordinate[1];

    let foundSymbol = false;
    // check current value is not in the far left
    if (x > 0) {
      foundSymbol = foundSymbol || checkGear(x - 1, y);
    }

    // check left above diagonal side
    if (x > 0 && y > 0) {
      foundSymbol = foundSymbol || checkGear(x - 1, y - 1);
    }

    // check above
    if (y > 0) {
      foundSymbol = foundSymbol || checkGear(x, y - 1);
    }

    // check right above diagonal side
    if (y > 0 && x < width - 1) {
      foundSymbol = foundSymbol || checkGear(x + 1, y - 1);
    }

    // check right side
    if (x < width - 1) {
      foundSymbol = foundSymbol || checkGear(x + 1, y);
    }

    // check right down diagonal side
    if (y < height - 1 && x < width - 1) {
      foundSymbol = foundSymbol || checkGear(x + 1, y + 1);
    }

    //  check below
    if (y < height - 1) {
      foundSymbol = foundSymbol || checkGear(x, y + 1);
    }

    // check left below diagonal side
    if (y < height - 1 && x > 0) {
      foundSymbol = foundSymbol || checkGear(x - 1, y + 1);
    }
  }
}
let answer = 0;
for (gear in gears) {
  const keys = Object.keys(gears[gear]);
  if (keys.length === 2) {
    const number =
      Number(keys[0].split(",").join("")) * Number(keys[1].split(",").join(""));
    answer += number;
  }
}
console.log(answer);
