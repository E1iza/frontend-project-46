import _ from 'lodash';

const getAst = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortKeys = _.sortBy(keys);
  const diff = _.reduce(sortKeys, (acc, key) => {
    if ((data1[key] instanceof Object) && (data2[key] instanceof Object)) {
      return [...acc, { type: 'parent', [key]: getAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { type: 'unchanged', [key]: data1[key] }];
    }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return [...acc, { type: 'removed', [key]: data1[key] }];
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return [...acc, { type: 'added', [key]: data2[key] }];
    }
    return [...acc, { type: 'updated', [key]: { valueOld: data1[key], valueNew: data2[key] } }];
  }, []);
  return diff;
};

export default getAst;
