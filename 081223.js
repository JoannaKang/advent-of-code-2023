const fs = require("fs");
let input = fs.readFileSync("081223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").toString().split("\n");

const path = input[0];
const nodes = input.slice(2);

let parsedNodes = {};
nodes.map((node) => {
  const key = node.split("=")[0].trim();
  const values = node
    .split("=")[1]
    .split(",")
    .map((item) => item.trim().replace("(", "").replace(")", ""));
  // return { [key]: values };
  parsedNodes[key] = values;
});

console.log(parsedNodes);
// if path === l -> select value[key][0]
// if path === r -> select value[key][1]
function findNextNode(currentNode, instructionIndex) {
  let loopingIndex = instructionIndex % path.length;

  const direction = path[loopingIndex] === "L" ? 0 : 1;
  const nextNode = parsedNodes[currentNode][direction];
  return nextNode;
}

let counter = 0;

let travelingNodes = Object.keys(parsedNodes).filter((node) => node[2] == "A");
console.log(travelingNodes);

function canStop() {
  for (let nodeIdx = 0; nodeIdx < travelingNodes.length; ++nodeIdx) {
    if (travelingNodes[nodeIdx][2] !== "Z") {
      return false;
    }
  }
  return true;
}

// Part2
while (!canStop()) {
  for (let nodeIdx = 0; nodeIdx < travelingNodes.length; ++nodeIdx) {
    travelingNodes[nodeIdx] = findNextNode(travelingNodes[nodeIdx], counter);
  }
  counter++;

  if (counter % 1000000 == 0) {
    console.log(counter, travelingNodes);
  }
}
console.log(counter);

// Part1
// let nextNode = "AAA";
// while (nextNode !== "ZZZ") {
//   nextNode = findNextNode(nextNode);
//   counter++;
// }
// console.log(counter);
