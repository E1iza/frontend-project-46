import _ from 'lodash';

const analysisDiff = (str) => {
  let result = '';
  switch (str) {
    case 'parent':
      result = '  ';
      break;
    case 'unchanged':
      result = '  ';
      break;
    case 'updated':
      result = ['- ', '+ '];
      break;
    case 'removed':
      result = '- ';
      break;
    case 'added':
      result = '+ ';
      break;
    default:
      return result;
  }
  return result;
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
        return `${sign.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`.trimEnd();
      }
      if (value instanceof Object) {
        if (typeof sign === 'string') {
          return `${sign.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`.trimEnd();
        }
        const str1 = `${sign[0].padStart(offset, fill)}${key}: ${stylish(value.valueOld, fill, nextLevel)}`.trimEnd();
        const str2 = `${sign[1].padStart(offset, fill)}${key}: ${stylish(value.valueNew, fill, nextLevel)}`.trimEnd();
        return `${str1}\n${str2}`;
      }
      return `${sign.padStart(offset, fill)}${key}: ${value}`.trimEnd();
    });
    return `{\n${result.join('\n')}\n${''.padStart(offset - countFill, fill)}}`;
  }
  if (data instanceof Object) {
    const result = _.reduce(data, (acc, value, key) => {
      if (value instanceof Object) {
        acc.push(`${fill.repeat(offset)}${key}: ${stylish(value, fill, nextLevel)}`.trimEnd());
      } else acc.push(`${fill.repeat(offset)}${key}: ${value}`.trimEnd());
      return acc;
    }, []);
    return `{\n${result.join('\n')}\n${''.padStart(offset - countFill, fill)}}`;
  }
  return data;
};

export default stylish;
