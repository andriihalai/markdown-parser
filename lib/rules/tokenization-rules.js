module.exports = [
  //rule for bold
  [/ \*\*([\S ]+)\*\*/g, ' BOLD_OPEN $1 BOLD_CLOSE '],
  [/ \*\*([\S ]+)/g, ' BOLD_OPEN $1'],

  // rule for italic
  [/ _([\S ]+)_[,]? /g, ' ITALIC_OPEN $1 ITALIC_CLOSE '],
  [/ _([\S ]+)/g, ' ITALIC_OPEN $1'],

  // rule for monospaced
  [/ \`([\S ]+)\` /g, ' MONO_OPEN $1 MONO_CLOSE '],
];
