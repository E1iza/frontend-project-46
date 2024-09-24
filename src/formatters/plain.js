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
        acc[acc.length] = plain(value, `${parent}${key}.`);
        break;
      case 'unchanged':
        break;
      case 'updated':
        acc[acc.length] = `Property '${parent}${key}' was updated. From ${stylizationValue(value.valueOld)} to ${stylizationValue(value.valueNew)}`;
        break;
      case 'removed':
        acc[acc.length] = `Property '${parent}${key}' was removed`;
        break;
      case 'added':
        acc[acc.length] = `Property '${parent}${key}' was added with value: ${stylizationValue(value)}`;
        break;
      default:
        return acc;
    }
    return acc;
  }, []);
  return result.join('\n');
};

export default plain;
