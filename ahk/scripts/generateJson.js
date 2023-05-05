const fs = require('fs');

// Read the contents of the file
const contents = fs.readFileSync('../data/br-utf8.txt', 'utf8');

// Split the contents into an array of words
const words = contents.trim().split('\n');

// Convert the array to a JSON string
const json = JSON.stringify(words);

// Write the JSON string to a file
fs.writeFileSync('../data/words.json', json, 'utf8');