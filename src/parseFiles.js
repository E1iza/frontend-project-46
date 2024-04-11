import fs from 'fs';

const parseFiles = (filesPath) => {
  const content = fs.readFileSync(filesPath, 'utf8');
  return JSON.parse(content);
};

export default parseFiles;
