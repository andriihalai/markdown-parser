'use strict';

const Lexer = require('./../lib/Lexer');
const htmlRules = require('./../lib/rules/decryption-rules');
const ansiRules = require('./../lib/rules/ansi-decryption-rules');

describe('Lexer', () => {
  const lexer = new Lexer();

  describe('.getBlocks', () => {
    const cases = [
      ['', []],
      [
        'Some ```plain``` text _right_ here',
        ['Some ```plain``` text _right_ here'],
      ],
      [
        'Lorem Ipsum is **simply dummy\ntext** of the printing and\n\n`typesetting` industry.',
        [
          'Lorem Ipsum is **simply dummy\ntext** of the printing and',
          '`typesetting` industry.',
        ],
      ],
      ['Hello world\n\nNew Paragraph', ['Hello world', 'New Paragraph']],
      [
        '**First** paragraph\n\n_Second paragraph_\n\n```Third paragraph```',
        ['**First** paragraph', '_Second paragraph_', '```Third paragraph```'],
      ],
    ];
    let counter = 1;

    for (const [text, blocks] of cases) {
      test(`Text to blocks test ${counter}`, () => {
        expect(lexer.getBlocks(text)).toEqual(blocks);
      });
      counter++;
    }
  });

  describe('.getLines', () => {
    const cases = [
      ['', []],
      ['Some block', ['Some block']],
      [
        'First line\nSecond line\nThird line\n',
        ['First line', 'Second line', 'Third line'],
      ],
      [
        '**Some** text\n_to_ be `converted` to array\n of ```strings```',
        ['**Some** text', '_to_ be `converted` to array', ' of ```strings```'],
      ],
    ];

    let counter = 1;

    for (const [block, lines] of cases) {
      test(`Blocks to lines convertion test ${1}`, () => {
        expect(lexer.getLines(block)).toEqual(lines);
      });
      counter++;
    }
  });

  describe('.tokanizeBlocks', () => {
    const cases = [
      [[], []],
      [
        ['Simple block'],
        ['PARAGRAPH.OPEN', 'Simple', ' ', 'block', 'PARAGRAPH.CLOSE', '\n'],
      ],
      [
        ['**Bold** text'],
        [
          'PARAGRAPH.OPEN',
          'BOLD.OPENBoldBOLD.CLOSE',
          ' ',
          'text',
          'PARAGRAPH.CLOSE',
          '\n',
        ],
      ],
      [
        [
          'Some **more** **text** here',
          'Second paragraph',
          'Third _paragraph_',
        ],
        [
          'PARAGRAPH.OPEN',
          'Some',
          ' ',
          'BOLD.OPENmoreBOLD.CLOSE',
          ' ',
          'BOLD.OPENtextBOLD.CLOSE',
          ' ',
          'here',
          'PARAGRAPH.CLOSE',
          '\n',
          'PARAGRAPH.OPEN',
          'Second',
          ' ',
          'paragraph',
          'PARAGRAPH.CLOSE',
          '\n',
          'PARAGRAPH.OPEN',
          'Third',
          ' ',
          'ITALIC.OPENparagraphITALIC.CLOSE',
          'PARAGRAPH.CLOSE',
          '\n',
        ],
      ],
    ];

    let counter = 1;

    for (const [block, tokens] of cases) {
      test(`Blocks to tokens convertion test ${counter}`, () => {
        expect(lexer.tokenizeBlocks(block)).toEqual(tokens);
      });
      counter++;
    }
  });

  describe('.tokenize', () => {
    const cases = [
      [[], []],
      [
        [
          'PARAGRAPH.OPEN',
          'Some BOLD.OPENmoreBOLD.CLOSE  text here',
          'PARAGRAPH.CLOSE',
        ],
        [
          'PARAGRAPH.OPEN',
          'Some',
          ' ',
          'BOLD.OPENmoreBOLD.CLOSE',
          '  ',
          'text',
          ' ',
          'here',
          'PARAGRAPH.CLOSE',
          '\n',
        ],
      ],
      [
        ['MONO.OPENmy.fancy stringMONO.CLOSE'],
        ['MONO.OPENmy.fancy', ' ', 'stringMONO.CLOSE', '\n'],
      ],
      [
        ['BOLD.OPENLondon ITALIC.OPENis theITALIC.CLOSE capital of GB. '],
        [
          'BOLD.OPENLondon',
          ' ',
          'ITALIC.OPENis',
          ' ',
          'theITALIC.CLOSE',
          ' ',
          'capital',
          ' ',
          'of',
          ' ',
          'GB.',
          ' ',
          '\n',
        ],
      ],
    ];

    let counter = 1;

    for (const [lines, tokens] of cases) {
      test(`Tokenization test ${counter}`, () => {
        expect(lexer.tokenize(lines)).toEqual(tokens);
      });
      counter++;
    }
  });

  describe('.parse into html', () => {
    const cases = [
      [
        [
          'PARAGRAPH.OPEN',
          `I'm`,
          ' ',
          'BOLD.OPEN',
          'writing',
          ' ',
          'some',
          ' ',
          'tests',
          'BOLD.CLOSE',
          'PARAGRAPH.CLOSE',
        ],
        `<p>I'm <b>writing some tests</b></p>`,
      ],
      [
        [
          'ITALIC.OPEN',
          'my',
          ' ',
          'name',
          'ITALIC.CLOSE',
          '\n',
          'PRE.OPEN',
          '**bold**',
          'PRE.CLOSE',
        ],
        '<i>my name</i>\n\<pre>**bold**</pre>',
      ],
    ];
    let counter = 1;
    for (const [tokens, output] of cases) {
      test(`Parsing tokens into html test ${counter}`, () => {
        expect(lexer.parse(tokens, htmlRules)).toEqual(output);
      });
    }
  });

  describe('.parse into ansi', () => {
    const cases = [
      [
        [
          'PARAGRAPH.OPEN',
          `I'm`,
          ' ',
          'BOLD.OPEN',
          'writing',
          ' ',
          'some',
          ' ',
          'tests',
          'BOLD.CLOSE',
          'PARAGRAPH.CLOSE',
        ],
        `I'm \x1b[1mwriting some tests\x1b[22m`,
      ],
      [
        [
          'ITALIC.OPEN',
          'my',
          ' ',
          'name',
          'ITALIC.CLOSE',
          '\n',
          'PRE.OPEN',
          '**bold**',
          'PRE.CLOSE',
        ],
        '\x1b[3mmy name\x1b[23m\n\x1b[7m**bold**\x1b[27m',
      ],
    ];

    let counter = 1;
    for (const [tokens, output] of cases) {
      test(`Parsing tokens into ansi test ${counter}`, () => {
        expect(lexer.parse(tokens, ansiRules)).toEqual(output);
      });
    }
  });
});
