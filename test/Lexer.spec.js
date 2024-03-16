'use strict';

const Lexer = require('./../lib/Lexer');

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
});
