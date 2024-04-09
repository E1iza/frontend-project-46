#!/usr/bin/env node
import { program } from 'commander';

// const genDiff = (filepath1, filepath2) => {};

program
  .name('')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  // .option('-h, --help')
  // .option('-V, --version')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');

// program.command('genDiff')
//   .description('Команда выводит разницу между файлами')
//   .argument('<filepath1>', 'первый файл')
//   .argument('<filepath2>', 'второй файл')
//   .option('-h, --help')
//   .option('-V, --version')
//   .action((filepath1, filepath2) => {
//     console.log(genDiff(filepath1, filepath2));
//   });

program.parse();
