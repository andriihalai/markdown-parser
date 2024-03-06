const rules = require('./rules/tokenization-rules.js');
const {
  blockTokens,
  openingTokens,
  closingTokens,
} = require('./rules/decryption-rules.js');

module.exports = class Lexer {
  blocks = [];
  text = '';

  constructor(text) {
    this.text = text;
  }

  parse(lines) {
    let nesting = 0;
    let output = '';

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
        tokens[i] = tokens[i].replace(tokens[i], openingTokens.get(tokens[i]));
        output += ' ' + tokens[i];
      } else if (closingTokens.has(tokens[i])) {
        nesting--;
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
    }
    return output;
  }

  tokenize() {
    const tokens = [];
    const blocks = this.getBlocks();
    for (const block of blocks) {
      const lines = this.getLines(block);

      if (lines[0] === '```' && lines[lines.length - 1] === '```') {
        lines[0] = 'PRE_OPEN';
        lines[lines.length - 1] = 'PRE_CLOSE';
      } else {
        lines.unshift('PARAGRAPH_OPEN');
        lines.push('PARAGRAPH_CLOSE');
      }
      for (let i = 0; i < lines.length; i++) {
        if (lines[0] === 'PRE_OPEN') {
          tokens.push(...lines);
          break;
        }
        for (const rule of rules) {
          lines[i] = lines[i].replace(rule[0], rule[1]);
        }
        tokens.push(lines[i]);
      }
    }
    this.parse(tokens);
    return tokens;
  }

  getBlocks() {
    const regex = /(^[ \s\S].*(?:\n[A-Za-z\`].*)*)/gm;
    this.blocks = this.text.match(regex);
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i] = this.blocks[i].trim();
    }
    return this.blocks;
  }

  // Splits a block into lines
  getLines(block) {
    const regex = /^.*$/gm;
    const lines = block.match(regex);
    return lines;
  }
};
