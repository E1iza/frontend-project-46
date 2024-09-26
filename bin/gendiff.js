#!/usr/bin/env node
import { program } from 'commander';
import getDiff from '../src/index.js';

program
  .name('')
  .description('Compares two configuration __fixtures__ and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const result = getDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });

program.parse();
