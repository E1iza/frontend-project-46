import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath);
  return (extension === '.json') ? JSON.parse(file) : yaml.load(file);
};

export default parsers;
