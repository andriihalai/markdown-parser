const rules = require('./rules/tokenization-rules.js');
const {
  blockTokens,
  openingTokens,
  closingTokens,
} = require('./rules/decryption-rules.js');

module.exports = class Lexer {
  parse(tokens) {
    if (!tokens) return '';

    let nesting = 0;
    let output = '';

    for (let i = 0; i < tokens.length; i++) {
      if (blockTokens.has(tokens[i])) {
        tokens[i] = tokens[i].replace(tokens[i], blockTokens.get(tokens[i]));
      }

      for (const [key, value] of openingTokens) {
        if (tokens[i].match(key)) {
          tokens[i] = tokens[i].replace(key, value);
          nesting++;
        }
      }

      if (nesting >= 2) throw new Error('Nested tags are not allowed');

      for (const [key, value] of closingTokens) {
        if (tokens[i].match(key)) {
          tokens[i] = tokens[i].replace(key, value);
          nesting--;
        }
      }

      output += tokens[i];
      if (nesting !== 0 && tokens[i] === '\n')
        throw new Error('Unclosed tag found');
    }
    return output;
  }

  tokenizeBlocks(blocks) {
    blocks = blocks.filter((item) => item !== '');
    if (!blocks) return [];

    let lines = [];
    for (const block of blocks) {
      const blockLines = this.getLines(block);

      if (
        blockLines[0] === '```' &&
        blockLines[blockLines.length - 1] === '```'
      ) {
        blockLines[0] = 'PRE.OPEN';
        blockLines[blockLines.length - 1] = 'PRE.CLOSE';
      }

      blockLines.unshift('PARAGRAPH.OPEN');
      blockLines.push('PARAGRAPH.CLOSE');

      for (let i = 0; i < blockLines.length; i++) {
        if (blockLines[1] === 'PRE.OPEN') {
          lines.push(...blockLines);
          break;
        }
        for (const rule of rules) {
          blockLines[i] = blockLines[i].replace(rule[0], rule[1]);
        }
        lines.push(blockLines[i]);
      }
    }

    const tokens = this.tokenize(lines).filter((item) => item !== '');
    return tokens;
  }

  tokenize(lines) {
    if (!lines) return [];
    console.log(lines);

    const tokens = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].match(/(\S+|\s+)/g); // array of words
      if (lines[i] === 'PARAGRAPH.OPEN' || lines[i + 1] === 'PARAGRAPH.CLOSE') {
        tokens.push(...line);
        continue;
      }
      tokens.push(...line, '\n');
    }
    console.log(tokens);
    return tokens;
  }

  getBlocks(text) {
    if (!text) return [];
    const regex = /(^[ \s\S].*(?:\n[A-Za-z\`].*)*)/gm;
    const blocks = text.match(regex);
    for (let i = 0; i < blocks.length; i++) {
      blocks[i] = blocks[i].trim();
    }
    return blocks;
  }

  // Splits a block into lines
  getLines(block) {
    if (!block) return [];
    const regex = /^.*$/gm;
    let lines = block.match(regex).filter((item) => item !== '');
    return lines;
  }
};
