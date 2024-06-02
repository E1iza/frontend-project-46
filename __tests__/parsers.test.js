import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { expect, test } from '@jest/globals';
import parsers from '../src/parsers.js';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('parsers JSON', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const file1 = fs.readFileSync(pathFile1, 'utf8');
  const file2 = fs.readFileSync(pathFile2, 'utf8');
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  const pathExpectedFile = getFixturePath('expected');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const dataParse = parsers(data1, data2);
  expect(stylish(dataParse)).toEqual(expectedResult);
});

test('parsers YAML', () => {
  const pathFile1 = getFixturePath('file1.yaml');
  const pathFile2 = getFixturePath('file2.yml');
  const file1 = fs.readFileSync(pathFile1, 'utf8');
  const file2 = fs.readFileSync(pathFile2, 'utf8');
  const data1 = yaml.load(file1);
  const data2 = yaml.load(file2);
  const pathExpectedFile = getFixturePath('expected');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const dataParse = parsers(data1, data2);
  expect(stylish(dataParse)).toEqual(expectedResult);
});

test('unsupported format', () => {
  const pathFile1 = getFixturePath('file.txt');
  const pathFile2 = getFixturePath('file2.yml');
  expect(() => parsers(pathFile1, pathFile2)).toThrow('Данные форматы файлов не поддерживаются');
});
