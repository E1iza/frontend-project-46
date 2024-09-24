import parsers from './src/parsers.js';
import getAST from './src/getAST.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';

const getDiff = (filePath1, filePath2, style) => {
  const data1 = parsers(filePath1);
  const data2 = parsers(filePath2);
  const AST = getAST(data1, data2);
  let result = null;
  if (style === 'stylish') {
    result = stylish(AST);
  } else if (style === 'plain') {
    result = plain(AST);
  }
  if (style === 'json') {
    result = JSON.stringify(AST, null, 2, '\t');
  }
  console.log(result);
};

export default getDiff;
