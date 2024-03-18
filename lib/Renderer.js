const Lexer = require('./Lexer.js');
const htmlRules = require('./rules/decryption-rules.js');
const ansiRules = require('./rules/ansi-decryption-rules.js');

module.exports = class Renderer {
  constructor() {
    this.lexer = new Lexer();
  }

  render(text, format = 'html') {
    const blocks = this.lexer.getBlocks(text);
    const tokens = this.lexer.tokenizeBlocks(blocks);
    
    if (format === 'ansi') {
      return this.lexer.parse(tokens, ansiRules);
    }
     if (format === 'html') {
      return this.lexer.parse(tokens, htmlRules);
    }

    throw new Error('Wrong format');
  }
};
