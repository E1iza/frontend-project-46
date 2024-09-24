const stylizationValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (data, parent = '') => {
  const result = data.reduce((acc, item) => {
    const [diff, key] = Object.keys(item);
    const value = item[key];
    switch (item[diff]) {
      case 'parent':
        return [...acc, plain(value, `${parent}${key}.`)];
      case 'unchanged':
        break;
      case 'updated':
        return [...acc, `Property '${parent}${key}' was updated. From ${stylizationValue(value.valueOld)} to ${stylizationValue(value.valueNew)}`];
      case 'removed':
        return [...acc, `Property '${parent}${key}' was removed`];
      case 'added':
        return [...acc, `Property '${parent}${key}' was added with value: ${stylizationValue(value)}`];
      default:
        return acc;
    }
    return acc;
  }, []);
  return result.join('\n');
};

export default plain;
