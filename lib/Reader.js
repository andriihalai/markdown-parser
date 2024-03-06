module.exports = class Reader {
  text = '';
  idx = -1;

  constructor(text) {
    this.text = text;
  }

  next() {
    idx += 1;
    return this.text[this.idx];
  }

  peek() {
    return this.text[this.idx + 1];
  }

  getByIdx(idx) {
    return this.text[idx];
  }

  getIdx() {
    return this.idx;
  }

  getSubstring(startIdx, endIdx) {
    return this.text.substring(startIdx, endIdx);
  }

  hasNext() {
    if (this.next(idx + 1)) return true;
    return false;
  }

  readUntil(match, startIdx = this.idx) {
    
  }
};
