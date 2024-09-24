import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath);
  let data = null;
  if (extension === '.json') {
    data = JSON.parse(file);
  } else if ((extension === '.yaml' || extension === '.yml')) {
    data = yaml.load(file);
  } else {
    throw new Error('Данный формат файла не поддерживается');
  }
  return data;
};

export default parsers;
