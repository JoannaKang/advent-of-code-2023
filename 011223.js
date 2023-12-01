const fs = require("fs");

let input = fs.readFileSync("011223.txt").toString().split("\n");

let result = 0;

// Q1.
// for (let i = 0; i < input.length; i++) {
//   const arr = [];
//   const numbers = [...input[i]]
//     .map((char) => {
//       if (!isNaN(Number(char))) {
//         return char;
//       }
//     })
//     .filter((number) => number);

//   const firstItem = numbers[0];
//   const lastItem = numbers[numbers.length - 1];

//   arr.push(firstItem, lastItem);
//   const calibration = arr.join("");
//   result += Number(calibration);
// }
// console.log(result);

// Q2.
const NUMBERS = {
  one: 1,
  1: 1,
  two: 2,
  2: 2,
  three: 3,
  3: 3,
  four: 4,
  4: 4,
  five: 5,
  5: 5,
  six: 6,
  6: 6,
  seven: 7,
  7: 7,
  eight: 8,
  8: 8,
  nine: 9,
  9: 9,
};

for (let i = 0; i < input.length; i++) {
  const originStr = input[i];
  let str = originStr;
  let firstDigit;
  while (str.length) {
    const ObjKeys = Object.keys(NUMBERS);

    ObjKeys.forEach((key) => {
      if (str.startsWith(key)) {
        firstDigit = NUMBERS[key];
      }
    });

    if (firstDigit) {
      break;
    } else {
      str = str.slice(1);
    }
  }

  let secondDigit;
  let reversedStr = [...originStr].reverse().join("");

  while (reversedStr.length) {
    const ObjKeys = Object.keys(NUMBERS);

    ObjKeys.forEach((key) => {
      const reversedKey = [...key].reverse().join("");
      if (reversedStr.startsWith(reversedKey)) {
        secondDigit = NUMBERS[key];
      }
    });

    if (secondDigit) {
      break;
    } else {
      reversedStr = reversedStr.slice(1);
    }
  }

  const calibration = [firstDigit, secondDigit].join("");
  result += Number(calibration);
}

console.log(result);
