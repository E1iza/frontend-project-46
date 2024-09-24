import parsers from './src/parsers.js';
import getAST from './src/getAST.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';

const getDiff = (filePath1, filePath2, style = 'stylish') => {
  const data1 = parsers(filePath1);
  const data2 = parsers(filePath2);
  const AST = getAST(data1, data2);
  if (style === 'stylish') {
    return stylish(AST);
  }
  if (style === 'plain') {
    return plain(AST);
  }
  if (style === 'json') {
    return JSON.stringify(AST, null, 2, '\t');
  }
  return stylish(AST);
};

export default getDiff;
