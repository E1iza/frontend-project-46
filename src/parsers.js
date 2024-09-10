// import * as path from 'path';
// import fs from 'fs';
import _ from 'lodash';
import fs from 'fs';
import stylish from './stylish.js';
// import yaml from 'js-yaml';

const file1 = fs.readFileSync('../__fixtures__/file1.json', 'utf8');
const file2 = fs.readFileSync('../__fixtures__/file2.json', 'utf8');
const dat1 = JSON.parse(file1);
const dat2 = JSON.parse(file2);

const parsers = (data1, data2) => {
  const result = _.reduce(data1, (acc, value, key) => {
    if ((data1[key] instanceof Object) && (data2[key] instanceof Object)) {
      acc.push(['  ', { [key]: parsers(data1[key], data2[key]) }]);
    } else if (data1[key] === data2[key]) {
      acc.push(['  ', { [key]: data1[key] }]);
    } else if (data2[key]) {
      acc.push(['- ', { [key]: (data1[key]) }]);
      acc.push(['+ ', { [key]: data2[key] }]);
    } else acc.push(['- ', { [key]: data1[key] }]);
    return acc;
  }, []);
  _.map(data2, (value, key) => {
    if (!data1[key]) {
      result.push(['+ ', { [key]: data2[key] }]);
    }
  });
  result.sort(([, a], [, b]) => {
    const key1 = `${Object.keys(a)}`.toLowerCase();
    const key2 = `${Object.keys(b)}`.toLowerCase();
    if (key1 < key2) {
      return -1;
    }
    if (key1 > key2) {
      return 1;
    }
    return 0;
  });
  return result;
};

// export default parsers;
const data = parsers(dat1, dat2);
// console.log(data);

console.log(stylish(data));
