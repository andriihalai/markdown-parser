'use strict';

const fs = require('node:fs/promises');
const Renderer = require('./lib/Renderer.js');

async function f() {
  try {
    const mdFilePath = process.argv[2];
    const text = await fs.readFile(mdFilePath, 'utf-8');

    const renderer = new Renderer();
    const output = renderer.render(text);

    if (process.argv.includes('--out')) {
      const outputFilepathIndex = process.argv.indexOf('--out') + 1;
      const outputFilepath = process.argv[outputFilepathIndex];

      await fs.writeFile(outputFilepath, output);
    } else {
      console.log(output);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

f();
