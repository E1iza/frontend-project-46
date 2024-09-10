#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parsers from '../src/parsers.js';
import stylish from '../src/stylish.js';

program
  .name('')
  .description('Compares two configuration __fixtures__ and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(filepath1, 'utf8');
    const file2 = fs.readFileSync(filepath2, 'utf8');
    const extension1 = path.extname(filepath1);
    const extension2 = path.extname(filepath2);
    let data1 = null;
    let data2 = null;
    if (extension1 === '.json' && extension2 === '.json') {
      data1 = JSON.parse(file1);
      data2 = JSON.parse(file2);
    } else if ((extension1 === '.yaml' || extension1 === '.yml') && (extension2 === '.yaml' || extension2 === '.yml')) {
      data1 = yaml.load(file1);
      data2 = yaml.load(file2);
    } else {
      throw new Error('Данные форматы файлов не поддерживаются');
    }
    const result = parsers(data1, data2);
    console.log(stylish(result));
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
