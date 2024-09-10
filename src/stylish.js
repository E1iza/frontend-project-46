import _ from 'lodash';

const stylish = (data, fill = ' ', level = 0, countFill = 4) => {
  const offset = (level + 1) * countFill;
  const nextLevel = level + 1;
  if (data instanceof Array) {
    const result = data.map(([diff, item]) => {
      const key = Object.keys(item);
      const value = item[key];
      if (value instanceof Array) {
        return `${diff.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`.trimEnd();
      }
      if (value instanceof Object) {
        return `${diff.padStart(offset, fill)}${key}: ${stylish(value, fill, nextLevel)}`.trimEnd();
      }
      return `${diff.padStart(offset, fill)}${key}: ${value}`.trimEnd();
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
  throw new Error('Тип переданных данных не является Object или Array');
};

export default stylish;
