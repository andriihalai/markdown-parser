const blockTokens = new Map([
  ['PARAGRAPH.OPEN', '<p>'],
  ['PRE.OPEN', '<pre>'],
  ['PARAGRAPH.CLOSE', '</p>'],
  ['PRE.CLOSE', '</pre>'],
]);

const openingTokens = new Map([
  ['BOLD.OPEN', '<b>'],
  ['ITALIC.OPEN', '<i>'],
  ['MONO.OPEN', '<tt>'],
]);

const closingTokens = new Map([
  ['BOLD.CLOSE', '</b>'],
  ['ITALIC.CLOSE', '</i>'],
  ['MONO.CLOSE', '</tt>'],
]);

module.exports = { blockTokens, openingTokens, closingTokens };
