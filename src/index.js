import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import getAst from './getAST.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const getDiff = (filePath1, filePath2, style = 'stylish') => {
  const file1 = fs.readFileSync(filePath1, 'utf8');
  const file2 = fs.readFileSync(filePath2, 'utf8');
  const type1 = path.extname(filePath1).slice(1);
  const type2 = path.extname(filePath2).slice(1);
  const data1 = parsers(type1, file1);
  const data2 = parsers(type2, file2);
  const ast = getAst(data1, data2);
  const formatters = {
    stylish,
    plain,
    json: JSON.stringify,
  };
  return formatters[style](ast);
};

export default getDiff;
