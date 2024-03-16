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
        } else if (output[output.length - 1] === '\n') {
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
        blockLines[0] = 'PRE_OPEN';
        blockLines[blockLines.length - 1] = 'PRE_CLOSE';
      }

      blockLines.unshift('PARAGRAPH_OPEN');
      blockLines.push('PARAGRAPH_CLOSE');

      for (let i = 0; i < blockLines.length; i++) {
        if (blockLines[1] === 'PRE_OPEN') {
          lines.push(...blockLines);
          break;
        }
        for (const rule of rules) {
          blockLines[i] = blockLines[i].replace(rule[0], rule[1]);
        }
        lines.push(blockLines[i]);
      }
    }

    console.log(lines);

    const tokens = this.tokenize(lines).filter((item) => item !== '');
    console.log(tokens);
    return tokens;
  }

  tokenize(lines) {
    if (!lines) return [];

    const tokens = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].replace(/( ){2,}/g, ' '); // string
      line = line.split(' '); // array of words

      if (lines[i] === 'PARAGRAPH_OPEN' || lines[i + 1] === 'PARAGRAPH_CLOSE') {
        tokens.push(...line);
        continue;
      }
      tokens.push(...line, '\n');
    }

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
