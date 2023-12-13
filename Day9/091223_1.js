const fs = require("fs");
let input = fs.readFileSync("091223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").toString().split("\n");
let answer = 0;
for (let inputIdx = 0; inputIdx < input.length; inputIdx++) {
  const historyInput = input[inputIdx].split(" ").map((str) => Number(str));
  let currInput = historyInput;
  let nextStep = getDiffernce(historyInput);
  let isAllZero = currInput.every((val) => val === 0);
  const historyLog = [];
  while (currInput.length > 1) {
    nextStep = getDiffernce(currInput);
    currInput = nextStep;
    historyLog.push(currInput.slice(-1)[0]);
    isAllZero = currInput.every((val) => val === 0);
    if (isAllZero) {
      break;
    }
  }
  const expectedIncrement = historyLog.reduce((a, b) => a + b, 0);
  const expectedNumber = historyInput.slice(-1)[0] + expectedIncrement;
  answer += expectedNumber;
  // console.log(history, getDiffernce(diffArr));
}

console.log(answer);

function getDiffernce(history) {
  let prevValue = history[0];
  const differenceArr = [];
  for (let historyIdx = 1; historyIdx < history.length; historyIdx++) {
    const currentValue = history[historyIdx];
    const difference = currentValue - prevValue;
    differenceArr.push(difference);
    prevValue = currentValue;
  }
  return differenceArr;
}
