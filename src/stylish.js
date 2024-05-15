const stylish = (object) => {
  const newObject = structuredClone(object);
  newObject.sort(([, a], [, b]) => {
    const [key1] = a.split(':');
    const [key2] = b.split(':');
    if (key1.toLowerCase() < key2.toLowerCase()) {
      return -1;
    }
    if (key1.toLowerCase() > key2.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  const result = newObject.map((item) => item.join(' '));
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default stylish;
