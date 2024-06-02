const getDataSort = (array) => {
  array.sort(([, a], [, b]) => {
    const [key1] = Object.keys(a);
    const [key2] = Object.keys(b);
    if (a[key1] instanceof Array) {
      getDataSort(a[key1]);
    }
    if (key1.toLowerCase() < key2.toLowerCase()) {
      return -1;
    }
    if (key1.toLowerCase() > key2.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

const stylish = (data, fill, countFill) => {
  const newData = structuredClone(data);
  getDataSort(newData);
  const formated = (array) => {
    let result = '{\n';
    array.reduce(acc, (item) => {
      
    }, result);
  };
  // const result = newObject.map((item) => item.join(' '));
  // return `{\n  ${result.join('\n  ')}\n}`;
  return newData;
};

export default stylish;
