const openingTokens = new Map([
  ['PARAGRAPH_OPEN', '<p>'],
  ['PRE_OPEN', '<pre>'],
  ['BOLD_OPEN', '<b>'],
  ['ITALIC_OPEN', '<i>'],
  ['MONO_OPEN', '<tt>'],
]);

const closingTokens = new Map([
  ['PARAGRAPH_CLOSE', '</p>'],
  ['PRE_CLOSE', '</pre>'],
  ['BOLD_CLOSE', '</b>'],
  ['ITALIC_CLOSE', '</i>'],
  ['MONO_CLOSE', '</tt>'],
]);

module.exports = { openingTokens, closingTokens };
