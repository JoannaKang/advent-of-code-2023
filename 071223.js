const fs = require("fs");
const { get } = require("http");
let input = fs.readFileSync("071223.txt").toString().split("\n");
// let input = fs.readFileSync("sample.txt").toString().split("\n");

const hands = input.map((item) => item.split(" ")[0]);
const bids = input.map((item) => Number(item.split(" ")[1]));

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
  dictArr.push(obj);
}

function getHighestValue(dict) {
  return Math.max(...Object.values(dict));
}

const mappedResult = {};
for (let i = 0; i < dictArr.length; i++) {
  const dict = dictArr[i];
  const originHand = hands[i];
  const highestValue = getHighestValue(dict);
  const type = getType(highestValue, dict);
  if (mappedResult[type] === undefined) {
    mappedResult[type] = [originHand];
  } else {
    mappedResult[type].push(originHand);
  }
}
getRank(mappedResult);

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
// Five of a kind > Four of a kind > Full house > Three of a kind > Two pair > One pair > High card

function getRank(mappedResult) {
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
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  function getHighestKey(handMap) {
    let highestKey = null;
    let highestValue = 0;
    for (elem in handMap) {
      if (handMap[elem] > highestValue) {
        highestKey = elem;
        highestValue = handMap[elem];
      }
    }
    return highestKey;
  }

  const sortedResult = Object.entries(mappedResult).sort(
    (a, b) => RANK_TYPE.indexOf(a[0]) - RANK_TYPE.indexOf(b[0])
  );

  for (let typeIndex = 0; typeIndex < sortedResult.length; ++typeIndex) {
    sortedResult[typeIndex][1].sort((a, b) => {
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
  console.log(sortedResult);

  const rank = [];

  sortedResult.forEach((element) => {
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
}
//   // compare inside of the same rank
//   for (let [type, sameRank] of sortedResult) {
//     // const rank = RANK_TYPE.indexOf(type);
//     // console.log(type, rank, value);
//     const mapped = sameRank.map((str) => {
//       const obj = {};
//       [...str].map((s) => {
//         if (obj[s] !== undefined) {
//           obj[s] += 1;
//         } else {
//           obj[s] = 1;
//         }
//       });
//       return obj;
//     });

//     for (let i = 0; i < mapped.length; ++i) {
//       console.log(mapped[i], getHighestKey(mapped[i]));
//     }
//   }
// }
