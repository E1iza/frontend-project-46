import _ from 'lodash';

const getAST = (data1, data2) => {
  const result = _.reduce(data1, (acc, value, key) => {
    if ((data1[key] instanceof Object) && (data2[key] instanceof Object)) {
      acc.push({ diff: 'parent', [key]: getAST(data1[key], data2[key]) });
    } else if (data1[key] === data2[key]) {
      acc.push({ diff: 'unchanged', [key]: data1[key] });
    } else if (Object.hasOwn(data2, key)) {
      acc.push({ diff: 'updated', [key]: { valueOld: data1[key], valueNew: data2[key] } });
    } else acc.push({ diff: 'removed', [key]: data1[key] });
    return acc;
  }, []);
  _.map(data2, (value, key) => {
    if (!Object.hasOwn(data1, key)) {
      result.push({ diff: 'added', [key]: data2[key] });
    }
  });
  result.sort((a, b) => {
    const key1 = Object.keys(a)[1].toLowerCase();
    const key2 = Object.keys(b)[1].toLowerCase();
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

export default getAST;
