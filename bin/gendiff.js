#!/usr/bin/env node
import { program } from 'commander';
import * as path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import parsers from '../src/parsers.js';
import stylish from '../src/stylish.js';

program
  .name('')
  .description('Compares two configuration __fixtures__ and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
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
      throw new Error('Формат файла не поддерживается');
    }
    const diff = parsers(data1, data2);
    const options = program.opts();
    if (options.format === 'stylish') {
      console.log(stylish(diff));
    }
  });

program.parse();
