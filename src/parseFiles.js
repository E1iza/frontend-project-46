import fs from 'fs';
import _ from 'lodash';

const parseFiles = (filesPath1, filesPath2) => {
  const file1 = fs.readFileSync(filesPath1, 'utf8');
  const file2 = fs.readFileSync(filesPath2, 'utf8');
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
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

export default parseFiles;

// console.log(parseFiles('../__fixtures__/file1.json', '../__fixtures__/file2.json'));
