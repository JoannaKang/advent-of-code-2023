const fs = require("fs");
let input = fs.readFileSync("071223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").toString().split("\n");

const hands = input.map((item) => item.split(" ")[0]);
const bids = input.map((item) => Number(item.split(" ")[1]));

const RANK_TYPE = [
  "Five of a kind",
  "Four of a kind",
  "Full house",
  "Three of a kind",
  "Two pair",
  "One pair",
  "High card",
];

const CARD_RANK = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

// need to check whether Jocker is included
function convertJocker(obj) {
  const mutatedObj = obj;
  // check jocker is included in obj
  // Joker turns into the key which has maximum value
  const keys = Object.keys(obj);
  if (keys.includes("J") && keys.length > 1) {
    const noOfJ = obj["J"];
    delete mutatedObj["J"];
    const maxKey = Object.keys(mutatedObj).reduce((a, b) =>
      obj[a] > obj[b] ? a : b
    );
    mutatedObj[maxKey] += noOfJ;
  }
  return mutatedObj;
}

// Map to object : {string: frequency}
const dictArr = [];
for (let i = 0; i < hands.length; i++) {
  const arr = [...hands[i]];
  const obj = {};
  arr.map((s) => {
    if (obj[s] !== undefined) {
      obj[s] += 1;
    } else {
      obj[s] = 1;
    }
    return obj;
  });

  dictArr.push(convertJocker(obj));
}
// console.log(dictArr);

// Categorise the type of hands
const categorisedResult = {};
for (let i = 0; i < dictArr.length; i++) {
  const dict = dictArr[i];
  const originHand = hands[i];
  const highestValue = Math.max(...Object.values(dict));
  const type = getType(highestValue, dict);
  if (categorisedResult[type] === undefined) {
    categorisedResult[type] = [originHand];
  } else {
    categorisedResult[type].push(originHand);
  }
}
// console.log("categorisedResult", categorisedResult);

const sortedByRankType = Object.entries(categorisedResult).sort(
  (a, b) => RANK_TYPE.indexOf(a[0]) - RANK_TYPE.indexOf(b[0])
);

// compare the rank within the same time
for (let typeIndex = 0; typeIndex < sortedByRankType.length; ++typeIndex) {
  sortedByRankType[typeIndex][1].sort((a, b) => {
    for (let cardIndex = 0; cardIndex < a.length; ++cardIndex) {
      const cardA = a[cardIndex];
      const cardB = b[cardIndex];
      const rankA = CARD_RANK.indexOf(cardA);
      const rankB = CARD_RANK.indexOf(cardB);

      if (rankA < rankB) {
        return -1;
      } else if (rankB < rankA) {
        return 1;
      }
    }
    console.log("strange return should not ever happen");
    return 0;
  });
}
// console.log("sortedByRankType", sortedByRankType);

const rank = [];
sortedByRankType.forEach((element) => {
  element[1].forEach((hand) => {
    rank.push(hand);
  });
});

let answer = 0;
for (let rankIdx = 0; rankIdx < rank.length; ++rankIdx) {
  let handRank = rank.length - rankIdx;
  const bid = bids[hands.indexOf(rank[rankIdx])];
  answer += bid * handRank;
}

console.log(answer);

function getType(highestValue, dict) {
  if (highestValue === 5) {
    return "Five of a kind";
  } else if (highestValue === 4) {
    return "Four of a kind";
  } else if (highestValue === 3) {
    const noOfKeys = Object.keys(dict).length;
    if (noOfKeys === 3) {
      return "Three of a kind";
    } else {
      return "Full house";
    }
  } else if (highestValue === 2) {
    const noOfKeys = Object.keys(dict).length;
    if (noOfKeys === 4) {
      return "One pair";
    } else {
      return "Two pair";
    }
  } else {
    return "High card";
  }
}
