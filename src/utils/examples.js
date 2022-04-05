export const option1 = {
  productions: {
    S: 'aSab | b ',
    A: 'ab',
  },
  start: ['aSbAS', 'ab'],
  terminals: ['a', 'b'],
  nonTerminals: ['A', 'S'],
};

export const option2 = {
  productions: {
    S: 'aBSa | b',
    A: 'ab',
    B: 'b',
  },
  start: ['aBSa', 'aabb'],
  terminals: ['a', 'b'],
  nonTerminals: ['A', 'B', 'S'],
};

export const option3 = {
  productions: {
    S: 'Sb | aaa',
    A: 'ab',
  },
  start: ['Sb', 'aaa'],
  terminals: ['a', 'b'],
  nonTerminals: ['A', 'S'],
};
