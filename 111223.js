const fs = require("fs");
let input = fs.readFileSync("111223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").to\
String().split("\n");
// The image includes empty space (.) and galaxies
// The researcher is trying to figure out the sum of the lengths of the shortest path between every pair of galaxies.

// columns contain no galaxies -> twice as big

// Expand the universe, then find the length of the shortest path between every pair of galaxies.
// What is the sum of these lengths?

// 확장된 우주의 맵 만들기 :
// y축을 순회해 나가면서 x 좌표값이 같은 노드들중에 하나라도 #이 포함되어 있다면 break
// y축 순회가 끝났다면 모든 x+1, y 좌표에 . 을 추가한다
// .가 추가될때마다 width++

const height = input.length;
let width = input[0].length;

const galaxies = [];

for (let widthIdx = 0; widthIdx < width; widthIdx++) {
  for (let heightIdx = 0; heightIdx < height; heightIdx++) {
    if (input[heightIdx][widthIdx] === "#") {
      galaxies.push([heightIdx, widthIdx]);
    }
  }
}

const rowExpansions = [];
const columnExpansions = [];

for (let heightIdx = 0; heightIdx < height; heightIdx++) {
  const row = input[heightIdx];
  if (!row.includes("#")) {
    rowExpansions.push(heightIdx);
  }
}

for (let widthIdx = 0; widthIdx < width; widthIdx++) {
  let flag = false;
  for (let heightIdx = 0; heightIdx < height; heightIdx++) {
    if (input[heightIdx][widthIdx] === "#") {
      flag = true;
      break;
    }
  }
  if (!flag) {
    columnExpansions.push(widthIdx);
  }
}

// expanding galaxy
for (let galaxyIdx = 0; galaxyIdx < galaxies.length; galaxyIdx++) {
  const originCoordinate = galaxies[galaxyIdx];
  const originalY = originCoordinate[0];
  const originalX = originCoordinate[1];

  // expand row
  for (let rowIdx = 0; rowIdx < rowExpansions.length; rowIdx++) {
    const rowExpansion = rowExpansions[rowIdx];
    if (originalY > rowExpansion) {
      // Q1
      // originCoordinate[0]++;
      // Q2
      originCoordinate[0] += 999999;
    }
  }
  // expand column
  for (let colIdx = 0; colIdx < columnExpansions.length; colIdx++) {
    const colExpansion = columnExpansions[colIdx];
    if (originalX > colExpansion) {
      // Q1
      // originCoordinate[1]++;
      // Q2
      originCoordinate[1] += 999999;
    }
  }
}

console.log(galaxies);
let answer = 0;
for (let galaxyIdx = 0; galaxyIdx < galaxies.length; galaxyIdx++) {
  for (
    let galaxyIdx2 = galaxyIdx + 1;
    galaxyIdx2 < galaxies.length;
    galaxyIdx2++
  ) {
    const galaxy1 = galaxies[galaxyIdx];
    const galaxy2 = galaxies[galaxyIdx2];

    const xDiff = Math.abs(galaxy1[0] - galaxy2[0]);
    const yDiff = Math.abs(galaxy1[1] - galaxy2[1]);

    answer += xDiff;
    answer += yDiff;
  }
}

console.log(answer);
