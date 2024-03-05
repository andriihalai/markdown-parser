module.exports = [
  //rule for bold
  [/ \*\*([\S ]+)\*\*/g, ' BOLD_OPEN $1 BOLD_CLOSE '],

  // rule for italic
  [/ _([A-Za-z ]+)_/g, ' ITALIC_OPEN $1 ITALIC_CLOSE '],

  // rule for monospaced
  [/ \`([\S ]+)\`/g, ' MONO_OPEN $1 MONO_CLOSE '],
];
