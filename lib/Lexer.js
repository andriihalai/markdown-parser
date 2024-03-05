module.exports = class Lexer {
  blocks = [];
  reader;

  constructor(reader) {
    this.reader = reader;
  }

  analyze() {
    let idx = this.reader.getIdx();
    let startIdx = 0;
    let endIdx = 0;
    while (this.reader.hasNext()) {
      const char = this.reader.next();
      if (char === "`" && this.reader.getByIdx(idx++) == "`" && this.reader.getByIdx(idx + 2) == "`") {
        
      }
    }
  }

  isPreTag() {

  }
};
