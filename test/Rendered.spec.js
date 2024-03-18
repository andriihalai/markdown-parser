'use strict';

const Renderer = require('./../lib/Renderer');
const renderer = new Renderer();

test('Parsing markdown into html', () => {
  expect(renderer.render('**bold**', 'html')).toEqual('<p><b>bold</b></p>\n');

  expect(
    renderer.render(
      '**Lorem** Ipsum is _simply dummy_ text `of the printing` and typesetting industry.',
      'html'
    )
  ).toEqual(
    '<p><b>Lorem</b> Ipsum is <i>simply dummy</i> text <tt>of the printing</tt> and typesetting industry.</p>\n'
  );

  expect(
    renderer.render(
      'paragraph\n\n```\npreformatted **text** here\n```\n\nanother paragraph',
      'html'
    )
  ).toEqual(
    '<p>paragraph</p>\n<p><pre>\npreformatted **text** here\n</pre></p>\n<p>another paragraph</p>\n'
  );

  expect(renderer.render('**bold** text\n_italic text_', 'html')).toEqual(
    '<p><b>bold</b> text\n<i>italic text</i></p>\n'
  );
});

test('Parsing markdown into ansi', () => {
  expect(
    renderer.render(
      '**Lorem** Ipsum is _simply dummy_ text `of the printing` and typesetting industry.\n',
      'ansi'
    )
  ).toEqual(
    '\x1b[1mLorem\x1b[22m Ipsum is \x1b[3msimply dummy\x1b[23m text \x1b[7mof the printing\x1b[27m and typesetting industry.\n'
  );

  expect(
    renderer.render(
      'paragraph\n\n```\npreformatted **text** here\n```\n\nanother paragraph',
      'ansi'
    )
  ).toEqual(
    'paragraph\n\x1b[7m\npreformatted **text** here\n\x1b[27m\nanother paragraph\n'
  );

  expect(renderer.render('**bold** text\n_italic text_', 'ansi')).toEqual(
    '\x1b[1mbold\x1b[22m text\n\x1b[3mitalic text\x1b[23m\n'
  );
});
