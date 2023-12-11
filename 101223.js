const fs = require("fs");
let input = fs.readFileSync("101223.txt").toString().split("\n");

const height = input.length;
const width = input[0].length;
const startPoint = [];
for (let yIdx = 0; yIdx < height; yIdx++) {
  for (let xIdx = 0; xIdx < width; xIdx++) {
    if (input[yIdx][xIdx] === "S") {
      startPoint.push(yIdx, xIdx);
    }
  }
}

const left = [startPoint[0], startPoint[1] - 1];
const right = [startPoint[0], startPoint[1] + 1];
const up = [startPoint[0] - 1, startPoint[1]];
const down = [startPoint[0] + 1, startPoint[1]];

const adjacantPipes = { left, right, up, down };
const pipeTrail = [startPoint];
for (pipe in adjacantPipes) {
  const direction = getDirection(adjacantPipes[pipe]);
  if (direction[0][0] === startPoint[0]) {
    pipeTrail.push(adjacantPipes[pipe]);
    break;
  }
}

function compareCoordinate(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

while (true) {
  const currentPipe = pipeTrail[pipeTrail.length - 1];
  const prevPipe = pipeTrail[pipeTrail.length - 2];
  if (compareCoordinate(currentPipe, pipeTrail[0])) {
    break;
  }
  const direction = getDirection(currentPipe);
  if (compareCoordinate(direction[0], prevPipe)) {
    pipeTrail.push(direction[1]);
  } else {
    pipeTrail.push(direction[0]);
  }
}
const answer = (pipeTrail.length - 1) / 2;
console.log(answer);

function getDirection(coordinate) {
  const yIdx = coordinate[0];
  const xIdx = coordinate[1];
  let currPipe = input[yIdx][xIdx];
  console.log(currPipe);
  // Check curret pipe's type
  // return connected cooridnation
  switch (currPipe) {
    // | is a vertical pipe connecting north and south.
    case "|":
      return [
        [yIdx - 1, xIdx],
        [yIdx + 1, xIdx],
      ];
      break;
    // - is a horizontal pipe connecting east and west.
    case "-":
      return [
        [yIdx, xIdx - 1],
        [yIdx, xIdx + 1],
      ];
      break;
    // L is a 90-degree bend connecting north and east.
    case "L":
      return [
        [yIdx - 1, xIdx],
        [yIdx, xIdx + 1],
      ];
      break;
    // J is a 90-degree bend connecting north and west.
    case "J":
      return [
        [yIdx - 1, xIdx],
        [yIdx, xIdx - 1],
      ];
      break;
    // 7 is a 90-degree bend connecting south and west.
    case "7":
      return [
        [yIdx, xIdx - 1],
        [yIdx + 1, xIdx],
      ];
      break;
    // F is a 90-degree bend connecting south and east.
    case "F":
      return [
        [yIdx, xIdx + 1],
        [yIdx + 1, xIdx],
      ];
      break;
    // . is ground; there is no pipe in this tile.
    case ".":
      return "no pipe";
      break;
  }
}
// 스타팅포인트 (=s)로부터 시작해 다시 스타팅포인트로 돌아올때까지의 거리를 계산한다
// 구해진 거리 /2 = 가장 멀리 나아간 지점
