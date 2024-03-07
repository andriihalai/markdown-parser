const rules = require('./rules/tokenization-rules.js');
const {
  blockTokens,
  openingTokens,
  closingTokens,
} = require('./rules/decryption-rules.js');

module.exports = class Lexer {
  constructor(text) {
    this.text = text;
  }

  parse(lines) {
    // приходять рядки з addTokensToLines
    let nesting = 0;
    let output = '';

    //TODO
    // move this logic to addTokenToLines
    const tokens = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].replace(/( ){2,}/g, ' '); // string
      line = line.split(' '); // array of strings
      lines[i] = line;
      tokens.push(...line, '\n');
    }

    for (let i = 0; i < tokens.length; i++) {
      if (blockTokens.has(tokens[i])) {
        tokens[i] = tokens[i].replace(tokens[i], blockTokens.get(tokens[i]));
        output = output + tokens[i];
      } else if (openingTokens.has(tokens[i])) {
        nesting++;
        if (nesting >= 2) throw new Error('Nested tags are not allowed');
        tokens[i] = tokens[i].replace(tokens[i], openingTokens.get(tokens[i]));
        output += ' ' + tokens[i];
      } else if (closingTokens.has(tokens[i])) {
        nesting -= 1;
        tokens[i] = tokens[i].replace(tokens[i], closingTokens.get(tokens[i]));
        output += tokens[i] + ' ';
      } else {
        if (
          output[output.length - 1] === '>' ||
          output[output.length - 2] === '>'
        ) {
          output += tokens[i];
        } else {
          output += ' ' + tokens[i];
        }
      }
      if (nesting !== 0 && tokens[i] === '\n')
        throw new Error('Unclosed tag found');
    }
    return output;
  }

  addTokensToLines(blocks) {
    const tokens = [];
    for (const block of blocks) {
      const lines = this.getLines(block);

      if (lines[0] === '```' && lines[lines.length - 1] === '```') {
        lines[0] = 'PRE_OPEN';
        lines[lines.length - 1] = 'PRE_CLOSE';
      }

      lines.unshift('PARAGRAPH_OPEN');
      lines.push('PARAGRAPH_CLOSE');
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[1] === 'PRE_OPEN') {
          tokens.push(...lines);
          break;
        }
        for (const rule of rules) {
          lines[i] = lines[i].replace(rule[0], rule[1]);
        }
        tokens.push(lines[i]);
      }
    }
    return tokens;
  }

  getBlocks(text) {
    const regex = /(^[ \s\S].*(?:\n[A-Za-z\`].*)*)/gm;
    const blocks = text.match(regex);
    for (let i = 0; i < blocks.length; i++) {
      blocks[i] = blocks[i].trim();
    }
    return blocks;
  }

  // Splits a block into lines
  getLines(block) {
    const regex = /^.*$/gm;
    const lines = block.match(regex);
    return lines;
  }
};
