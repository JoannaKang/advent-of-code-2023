const fs = require("fs");
let input = fs.readFileSync("091223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").toString().splt("\n");

// 뒤가 아니라 앞의 값 유추하기

let answer = 0;
for (let inputIdx = 0; inputIdx < input.length; inputIdx++) {
  const historyInput = input[inputIdx].split(" ").map((str) => Number(str));
  let currInput = historyInput;
  let nextStep = getDiffernce(historyInput);
  let isAllZero = currInput.every((val) => val === 0);
  const historyLog = [];
  while (true) {
    nextStep = getDiffernce(currInput);
    console.log("💡", currInput);
    currInput = nextStep;
    historyLog.push(currInput.slice(0, 1)[0]);
    isAllZero = currInput.every((val) => val === 0);
    if (isAllZero) {
      break;
    }
  }
  // const expectedIncrement = historyLog.reduce((a, b) => a + b, 0);
  let prevValue = 0;
  for (let historIdx = historyLog.length - 1; historIdx >= 0; historIdx--) {
    prevValue = -prevValue + historyLog[historIdx];
  }
  prevValue = -prevValue + historyInput[0];
  answer += prevValue;
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
