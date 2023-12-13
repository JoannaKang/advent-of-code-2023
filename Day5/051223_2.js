const fs = require("fs");
let input = fs.readFileSync("051223.txt").toString().split("\n");

const seeds = input[0].split(":")[1].trim().split(" ").map(Number);

let seedPairs = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedPairs.push([seeds[i], seeds[i + 1]]);
}

const CATEGOROES = [
  "seed-to-soil map:",
  "soil-to-fertilizer map:",
  "fertilizer-to-water map:",
  "water-to-light map:",
  "light-to-temperature map:",
  "temperature-to-humidity map:",
  "humidity-to-location map:",
  "@",
];

function getMap(start, end) {
  const startIndex = input.indexOf(CATEGOROES[start]) + 1;
  const endIndex = input.indexOf(CATEGOROES[end]) - 1;
  const mapArr = input.slice(startIndex, endIndex);

  for (let i = 0; i < mapArr.length; i++) {
    mapArr[i] = mapArr[i].split(" ").map(Number);
  }

  return mapArr;
}

const mappings = CATEGOROES.map((category, index) => {
  return getMap(index, index + 1);
}).slice(0, CATEGOROES.length - 1);

// destination range | source range | range length
let smallestResult = Number.MAX_VALUE;
for (let i = 0; i < seedPairs.length; i++) {
  let seedPair = seedPairs[i];
  console.log("SeedPair ", i);
  for (let seedIndex = 0; seedIndex < seedPair[1]; seedIndex++) {
    let seed = seedPair[0] + seedIndex;
    for (let j = 0; j < mappings.length; j++) {
      const map = mappings[j];
      for (let k = 0; k < map.length; k++) {
        const range = map[k];
        const sourceBegin = range[1];
        const sourceEnd = sourceBegin + range[2];

        if (seed >= sourceBegin && seed < sourceEnd) {
          const gap = seed - sourceBegin;
          seed = range[0] + gap;
          break;
        }
      }
    }
    if (smallestResult > seed) {
      smallestResult = seed;
    }
  }
}
console.log(smallestResult);
