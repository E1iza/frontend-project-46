#!/usr/bin/env node
import { program } from 'commander';
import parseFiles from '../src/parseFiles.js';

program
  .name('')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(parseFiles(filepath1, filepath2));
  });

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
