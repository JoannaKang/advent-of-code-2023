const fs = require("fs");
let input = fs.readFileSync("081223.txt").toString().split("\n");

const path = input[0];
const nodes = input.slice(2);

let parsedNodes = {};
nodes.map((node) => {
  const key = node.split("=")[0].trim();
  const values = node
    .split("=")[1]
    .split(",")
    .map((item) => item.trim().replace("(", "").replace(")", ""));
  parsedNodes[key] = values;
});

function findNextNode(currentNode, instructionIndex) {
  let loopingIndex = instructionIndex % path.length;

  const direction = path[loopingIndex] === "L" ? 0 : 1;
  const nextNode = parsedNodes[currentNode][direction];
  return nextNode;
}

let travelingNodes = Object.keys(parsedNodes).filter((node) => node[2] == "A");

const cycles = [];

for (let nodeIdx = 0; nodeIdx < travelingNodes.length; nodeIdx++) {
  let nextNode = travelingNodes[nodeIdx];
  let counter = 0;

  while (nextNode[2] !== "Z") {
    nextNode = findNextNode(nextNode, counter);
    counter++;
  }

  cycles.push(counter);
}

function gcd(a, b) {
  while (b != 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

let lcmValue = cycles[0];
for (let i = 1; i < cycles.length; i++) {
  lcmValue = lcm(lcmValue, cycles[i]);
}

console.log(lcmValue);
