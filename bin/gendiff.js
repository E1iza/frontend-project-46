#!/usr/bin/env node
import { program } from 'commander';

const genDiff = (filepath1, filepath2) => {};

program
  .name('')
  .description('Инструмент определяющий разницу между файлами')
  .version('1.0.0');

program.command('genDiff')
  .description('Команда выводит разницу между файлами')
  .argument('<filepath1>', 'первый файл')
  .argument('<filepath2>', 'второй файл')
  .option('-h, --help')
  .option('-V, --version')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();
