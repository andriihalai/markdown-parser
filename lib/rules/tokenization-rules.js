module.exports = [
  //rule for bold
  [/(?<=^|\s)\*\*([\S\s]+?)\*\*(?=\s|$)/g, ' BOLD_OPEN $1 BOLD_CLOSE '],
  [/(?<=^|\s)\*\*([\S ]+)(?:$| )/g, ' BOLD_OPEN $1'],

  // rule for italic
  [/(?<=^|\s)_([\S ]+)_(?=\s|$)/g, ' ITALIC_OPEN $1 ITALIC_CLOSE '],
  [/(?<=^|\s)_([\S ]+)(?:$| )/g, ' ITALIC_OPEN $1'],

  // rule for monospaced
  [/(?<=^|\s)\`([\S ]+)\`(?=\s|$)/g, ' MONO_OPEN $1 MONO_CLOSE '],
  [/(?<=^|\s)\`([\S ]+)(?:$| )/g, ' MONO_OPEN $1'],
];
