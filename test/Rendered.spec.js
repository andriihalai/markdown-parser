'use strict';

const Renderer = require('./../lib/Renderer');

test('Parsing markdown into html', () => {
  const renderer = new Renderer();
  const text = renderer.render('**bold**');

  expect(renderer.render('**bold**')).toEqual('<p>**bold**</p>\n');
});
