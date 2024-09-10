import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import { expect, test } from '@jest/globals';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('parsers JSON', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const pathExpectedFile = getFixturePath('expected');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  expect(parsers(pathFile1, pathFile2)).toEqual(expectedResult);
});

test('parsers YAML', () => {
  const pathFile1 = getFixturePath('file1.yaml');
  const pathFile2 = getFixturePath('file2.yml');
  const pathExpectedFile = getFixturePath('expected');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  expect(parsers(pathFile1, pathFile2)).toEqual(expectedResult);
});

// test('unsupported format', () => {
//   const pathFile1 = getFixturePath('file.txt');
//   const pathFile2 = getFixturePath('file2.yml');
//   expect(parsers(pathFile1, pathFile2)).toThrow('Данные форматы файлов не поддерживаются');
// });
