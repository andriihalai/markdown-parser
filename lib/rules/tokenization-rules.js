module.exports = [
  //rule for bold
  [/\*\*([\S\s]+?)\*\*/g, 'BOLD.OPEN$1BOLD.CLOSE'],
  [/(?<=^|\s)\*\*([\S ]+)(?:$| )/g, 'BOLD.OPEN$1'],

  // rule for italic
  [/_([\S ]+)_/g, 'ITALIC.OPEN$1ITALIC.CLOSE'],
  [/(?<=^|\s)_([\S ]+)(?:$| )/g, 'ITALIC.OPEN$1'],

  // rule for monospaced
  [/\`([\S ]+)\`/g, 'MONO.OPEN$1MONO.CLOSE'],
  [/(?<=^|\s)\`([\S ]+)(?:$| )/g, 'MONO.OPEN$1'],
];
