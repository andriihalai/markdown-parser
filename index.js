'use strict';

const fs = require('node:fs/promises');
const { program } = require('commander');
const Renderer = require('./lib/Renderer.js');

async function main() {
  try {
    program
      .option('--out [outFilepath]', 'Specify output filepath')
      .option('--format <value>', 'Specify the format')
      .parse(process.argv);

    const { format, out: outFilepath } = program.opts();

    const mdFilePath = process.argv[2];
    const text = await fs.readFile(mdFilePath, 'utf-8');

    const renderer = new Renderer();
    const output = renderer.render(text, format);

    if (outFilepath) {
      await fs.writeFile(outFilepath, output);
    } else {
      console.log(output);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
