module.exports = class Lexer {
  blocks = [];
  text = '';

  constructor(text) {
    this.text = text;
  }

  analyze() {}

  getBlocks() {
    const regex = /(^[ \s\S].*(?:\n[A-Za-z\`].*)*)/gm;
    this.blocks = this.text.match(regex);
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i] = this.blocks[i].trim();
    }
    return this.blocks;
  }

  getLines(block) {
    const regex = /^.*$/gm;
    const lines = block.match(regex);
    return lines;
  }
};
