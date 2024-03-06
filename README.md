# Markdown parser
The console app designed to parse markdown into html. There are possibilities to output resulted html to the console or to the specific file. Supported tags are ** for **bold**, _ for _italic_, \` for `monospaced`, \`\`\` for ```preformatted```. 

## Installation
1. Clone the repository using this command:
```bash
git clone https://github.com/andriihalai/markdown-parser.git
```
2. Change into directory:
```bash
cd markdown-parser
```
3. Install dependencies
```bash
npm install
```

## How to use
* To parse markdown and get the output into the console run:
```bash
node index.js /path/to/markdown/file
```
* To parse markdown and save the output to the file run:
```bash
node index.js /path/to/markdown/file --out /path/to/output/file
```

## Revert commit
[Revert commit](https://github.com/andriihalai/markdown-parser/commit/cd5ba56737eded9d6afdfb616ca5098757f28bd1)