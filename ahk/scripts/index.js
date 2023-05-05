const { writeFileSync, readFileSync } = require('fs');

const AHK_FILE_TEMPLATE = `#SingleInstance, Force\nFileEncoding, UTF-8\nSendMode Input\nSetWorkingDir, %A_ScriptDir%`

function findCircunflexWords(words) {
  const specialWords = words.filter(word => word.length > 1 && /[âêîôû]/i.test(word));
  return specialWords;
}

function findTildeWords(words) {
  const specialWords = words.filter(word => word.length > 1 && /[ãẽĩõũ]/i.test(word));
  return specialWords;
}

function removeAccents(word) {
  const accentsRegex = /[\u0300-\u036f]/g; // Matches any combining diacritical mark
  const nonAccentedWord = word.normalize("NFD").replace(accentsRegex, "");
  return nonAccentedWord;
}

function generateAhkReplacementLine(word) {
  return `::${removeAccents(word)}::${word}`
}

function generateAhkReplacements(words) {
  const tildeWords = findTildeWords(words);
  const circunflexWords = findCircunflexWords(words);

  const tildeReplacements = tildeWords.map(generateAhkReplacementLine);
  const circunflexReplacements = circunflexWords.map(generateAhkReplacementLine);

  writeFileSync('../generated/tilde.ahk', `${AHK_FILE_TEMPLATE}\n\n${tildeReplacements.join('\n')}`);

  writeFileSync('../generated/circunflex.ahk', `${AHK_FILE_TEMPLATE}\n\n${circunflexReplacements.join('\n')}`);
}

const contents = readFileSync('../data/words.json', 'utf8');

// Parse the JSON data into an array
const words = JSON.parse(contents);

generateAhkReplacements(words);