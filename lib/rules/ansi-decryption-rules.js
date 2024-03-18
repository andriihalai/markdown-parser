const blockTokens = new Map([
  ['PARAGRAPH.OPEN', ''],
  ['PRE.OPEN', '\x1b[7m'],
  ['PARAGRAPH.CLOSE', ''],
  ['PRE.CLOSE', '\x1b[27m'],
]);

const openingTokens = new Map([
  ['BOLD.OPEN', '\u001b[1m'],
  ['ITALIC.OPEN', '\u001b[3m'],
  ['MONO.OPEN', '\x1b[7m'],
]);

const closingTokens = new Map([
  ['BOLD.CLOSE', '\u001b[22m'],
  ['ITALIC.CLOSE', '\u001b[23m'],
  ['MONO.CLOSE', '\x1b[27m'],
]);

module.exports = [blockTokens, openingTokens, closingTokens];
