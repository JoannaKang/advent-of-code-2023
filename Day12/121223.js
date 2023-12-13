const fs = require("fs");
let input = fs.readFileSync("../input/121223.txt").toString().split("\n");
// their condition records of which springs are damaged (your puzzle input) are also damaged!
// You'll need to help them repair the damaged records.

// the springs are arranged into rows. For each row, the condition records show every spring
// operational : .
// damaged : #
// unknown : ?

// the size of each contiguous group of damaged springs is listed in the order those groups appear in the row
// This list always accounts for every damaged spring, and each number is the entire size of its contiguous group
// figure out how many different arrangements of operational and broken springs fit the given criteria in each row.

// Q
// For each row, count all of the different arrangements of operational and broken springs that meet the given criteria.
// What is the sum of those counts?

console.log(input);
