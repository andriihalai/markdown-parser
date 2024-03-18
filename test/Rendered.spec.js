'use strict';

const Renderer = require('./../lib/Renderer');

test('Parsing markdown into html', () => {
  const renderer = new Renderer();
  expect(renderer.render('**bold**')).toEqual('<p><b>bold</b></p>\n');

  expect(
    renderer.render(
      '**Lorem** Ipsum is _simply dummy_ text `of the printing` and typesetting industry.'
    )
  ).toEqual(
    '<p><b>Lorem</b> Ipsum is <i>simply dummy</i> text <tt>of the printing</tt> and typesetting industry.</p>\n'
  );

  expect(
    renderer.render(
      'paragraph\n\n```\npreformatted **text** here\n```\n\nanother paragraph'
    )
  ).toEqual(
    '<p>paragraph</p>\n<p><pre>\npreformatted **text** here\n</pre></p>\n<p>another paragraph</p>\n'
  );

  expect(renderer.render('**bold** text\n_italic text_')).toEqual(
    '<p><b>bold</b> text\n<i>italic text</i></p>\n'
  );
});
