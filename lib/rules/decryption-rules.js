const blockTokens = new Map([
  ['PARAGRAPH_OPEN', '<p>'],
  ['PRE_OPEN', '<pre>'],
  ['PARAGRAPH_CLOSE', '</p>'],
  ['PRE_CLOSE', '</pre>'],
]);

const openingTokens = new Map([
  ['BOLD_OPEN', '<b>'],
  ['ITALIC_OPEN', '<i>'],
  ['MONO_OPEN', '<tt>'],
]);

const closingTokens = new Map([
  ['BOLD_CLOSE', '</b>'],
  ['ITALIC_CLOSE', '</i>'],
  ['MONO_CLOSE', '</tt>'],
]);

module.exports = { blockTokens, openingTokens, closingTokens };
