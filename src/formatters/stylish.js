import _ from 'lodash';
// import fs from "fs";
// import getDiff from "../index.js";

const analysisDiff = (type) => {
  const mapType = {
    parent: '  ',
    unchanged: '  ',
    updated: ['- ', '+ '],
    removed: '- ',
    added: '+ ',
  };
  return mapType[type] ?? '';
};

const stylish = (data, fill = ' ', level = 0, countFill = 4) => {
  const offset = (level + 1) * countFill;
  const nextLevel = level + 1;
  if (data instanceof Array) {
    const result = data.map((item) => {
      const [type, key] = Object.keys(item);
      const value = item[key];
      const sign = analysisDiff(item[type]);
      if (value instanceof Array) {
        return `${sign.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`;
      }
      if (value instanceof Object) {
        if (sign instanceof Array) {
          const str1 = `${sign[0].padStart(offset, fill)}${key}: ${stylish(value.valueOld, fill, nextLevel)}`;
          const str2 = `${sign[1].padStart(offset, fill)}${key}: ${stylish(value.valueNew, fill, nextLevel)}`;
          return `${str1}\n${str2}`;
        }
        return `${sign.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`;
      }
      return `${sign.padStart(offset, fill)}${key}: ${value}`;
    });
    return `{\n${result.join('\n')}\n${''.padStart(offset - countFill, fill)}}`;
  }
  if (data instanceof Object) {
    const result = _.reduce(data, (acc, value, key) => {
      if (value instanceof Object) {
        return [...acc, `${fill.repeat(offset)}${key}: ${stylish(value, fill, nextLevel)}`];
      }
      return [...acc, `${fill.repeat(offset)}${key}: ${value}`];
    }, []);
    return `{\n${result.join('\n')}\n${''.padStart(offset - countFill, fill)}}`;
  }
  return data;
};

export default stylish;

// const pathFile1 = '../../__fixtures__/file3.yaml';
// const pathFile2 = '../../__fixtures__/file4.yaml';
// const data = getDiff(pathFile1, pathFile2);
// console.log(data);
// console.log(stylish(data));
