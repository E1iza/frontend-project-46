import * as path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = (filePath1, filePath2) => {
  const file1 = fs.readFileSync(filePath1, 'utf8');
  const file2 = fs.readFileSync(filePath2, 'utf8');
  const extension1 = path.extname(filePath1);
  const extension2 = path.extname(filePath2);
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
  let result = _.reduce(data1, (acc, value, key) => {
    if (data1[key] === data2[key]) {
      acc.push([' ', `${key}: ${value}`]);
    } else if (data2[key]) {
      acc.push(['-', `${key}: ${value}`]);
      acc.push(['+', `${key}: ${data2[key]}`]);
    } else acc.push(['-', `${key}: ${value}`]);
    return acc;
  }, []);
  _.map(data2, (value, key) => {
    if (!data1[key]) {
      result.push(['+', `${key}: ${value}`]);
    }
  });
  result.sort(([, a], [, b]) => {
    const [key1] = a.split(':');
    const [key2] = b.split(':');
    if (key1.toLowerCase() < key2.toLowerCase()) {
      return -1;
    }
    if (key1.toLowerCase() > key2.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  result = result.map((item) => item.join(' '));
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default parsers;

// console.log(parsers('../__fixtures__/file1.json', '../__fixtures__/file2.json'));
