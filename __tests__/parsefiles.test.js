import * as path from 'path';
import fs from 'fs';
import parseFiles from '../src/parseFiles.js';

const __filename = import.meta.filename;
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('parseFiles', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const pathExpectedFile = getFixturePath('expected');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  expect(parseFiles(pathFile1, pathFile2)).toEqual(expectedResult);
});
