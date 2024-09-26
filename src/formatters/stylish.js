import _ from 'lodash';

const analysisDiff = (str) => {
  switch (str) {
    case 'parent':
      return '  ';
    case 'unchanged':
      return '  ';
    case 'updated':
      return ['- ', '+ '];
    case 'removed':
      return '- ';
    case 'added':
      return '+ ';
    default:
      // return '';
  }
  return str;
};

const stylish = (data, fill = ' ', level = 0, countFill = 4) => {
  const offset = (level + 1) * countFill;
  const nextLevel = level + 1;
  if (data instanceof Array) {
    const result = data.map((item) => {
      const [diff, key] = Object.keys(item);
      const value = item[key];
      const sign = analysisDiff(item[diff]);
      if (value instanceof Array) {
        return `${sign.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`;
      }
      if (value instanceof Object) {
        if (typeof sign === 'string') {
          return `${sign.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`;
        }
        const str1 = `${sign[0].padStart(offset, fill)}${key}: ${stylish(value.valueOld, fill, nextLevel)}`;
        const str2 = `${sign[1].padStart(offset, fill)}${key}: ${stylish(value.valueNew, fill, nextLevel)}`;
        return `${str1}\n${str2}`;
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
