export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function isItNonTerminal(char) {
  return char.toUpperCase() === char;
}
