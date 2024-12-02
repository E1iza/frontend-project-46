import _ from 'lodash';

const getAst = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortKeys = _.sortBy(keys);
  return _.reduce(sortKeys, (acc, key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return [...acc, { typeDiff: 'parent', [key]: getAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { typeDiff: 'unchanged', [key]: data1[key] }];
    }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return [...acc, { typeDiff: 'removed', [key]: data1[key] }];
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return [...acc, { typeDiff: 'added', [key]: data2[key] }];
    }
    return [...acc, { typeDiff: 'updated', [key]: { valueOld: data1[key], valueNew: data2[key] } }];
  }, []);
};

export default getAst;
