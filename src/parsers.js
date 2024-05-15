import _ from 'lodash';

const parsers = (dataFirst, dataSecond) => {
  const result = _.reduce(dataFirst, (acc, value, key) => {
    if (value instanceof Object) {
      if (dataSecond[key]) {
        acc.push([' ', `${key}: ${parsers(value, dataSecond[key])}`]);
      } else acc.push(['-', `${key}: ${value}`]);
    }
    if (dataFirst[key] === dataSecond[key]) {
      acc.push([' ', `${key}: ${value}`]);
    } else if (dataSecond[key]) {
      acc.push(['-', `${key}: ${value}`]);
      acc.push(['+', `${key}: ${dataSecond[key]}`]);
    } else acc.push(['-', `${key}: ${value}`]);
    return acc;
  }, []);
  _.map(dataSecond, (value, key) => {
    if (!dataFirst[key]) {
      result.push(['+', `${key}: ${value}`]);
    }
  });
  return result;
};

export default parsers;

// console.log(parsers('../__fixtures__/file1.json', '../__fixtures__/file2.json'));
