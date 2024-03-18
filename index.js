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

    let { format, out: outFilepath } = program.opts();

    const mdFilePath = process.argv[2];
    const text = await fs.readFile(mdFilePath, 'utf-8');

    const renderer = new Renderer();
    
    if (outFilepath) {
      const output = renderer.render(text, format);
      await fs.writeFile(outFilepath, output);
    } else if (format) {
      const output = renderer.render(text, format);
      console.log(output);
    } else {
      format = 'ansi';
      const output = renderer.render(text, format);
      console.log(output);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
