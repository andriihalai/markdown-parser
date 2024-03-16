const Lexer = require('./Lexer.js');

module.exports = class Renderer {
  render(text) {
    const lexer = new Lexer();
    const blocks = lexer.getBlocks(text);
    const tokens = lexer.tokenizeBlocks(blocks);
    const output = lexer.parse(tokens);
    return output;
  }
};
