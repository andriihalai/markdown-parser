# Markdown parser

The console app designed to parse markdown tags into html tags or ansi escape codes.
There are possibilities to output resulted text to the console or to the specific file.
By default markdown tags are transformed and printed to the console.
Default format for saving parsed markdown to a file is html.
Supported tags are ** for **bold\*\*, _ for \_italic_, \` for `monospaced`, \`\`\` for `preformatted`.

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

- To parse markdown into asni escape code and output it to console run:

```bash
node index.js /path/to/markdown/file
```

- You can specify the output file by using the **--out** option:

```bash
node index.js /path/to/markdown/file --out path/to/output/file
```

- To parse markdown (default format is **ansi** if the file is not specified)
  and get the output to the console run:

```bash
node index.js /path/to/markdown/file
```

- To parse markdown (default format is **html** if the format not specified) and save the output to the file run:

```bash
node index.js /path/to/markdown/file --out /path/to/output/file
```

- You can choose the format using **--format=value** option with **html** or **ansi** value:

```bash
node index.js /path/to/markdown/file --format=html
```

```bash
node index.js /path/to/markdown/file --format=ansi --out path/to/output/file
```

## How to run tests

- To run tests use the command:

```bash
npm test
```

- To run tests in the development mode use:

```bash
npm run test:dev
```

## Посилання на коміт на якому тести впали

[Failure build]()

## Revert commit

[Revert commit](https://github.com/andriihalai/markdown-parser/commit/cd5ba56737eded9d6afdfb616ca5098757f28bd1)

## Висновки

Виконуючи дану лабораторну роботу, за допомогою юніт тестів я зміг
знайти досить багато недоліків свого додатку, що навіть привезвело до
зміни частини логіки програми. З недоліків тестів помітив те, що змінюючи
логіку роботи деяких функцій, потім також потрібно змінювати тести, а це
все займає досить багато часу. Загалом варто відзначити, що написання тестів
має сенс, оскільки дозволяє відловити багато багів ще на стадії розробки
додатку.
