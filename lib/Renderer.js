const Lexer = require('./Lexer.js');

module.exports = class Renderer {
  render(text) {
    const lexer = new Lexer();
    const blocks = lexer.getBlocks(text);
    const tokens = lexer.addTokensToLines(blocks);
    const output = lexer.parse(tokens);
    return output;
  }
};
