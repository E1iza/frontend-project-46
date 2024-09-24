import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import { expect, test } from '@jest/globals';
import parsers from '../src/parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import getAST from '../src/getAST.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('parsers JSON stylish', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const data1 = parsers(pathFile1);
  const data2 = parsers(pathFile2);
  const pathExpectedFile = getFixturePath('expected_stylish');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const diff = getAST(data1, data2);
  expect(stylish(diff)).toEqual(expectedResult);
});

test('parsers YAML stylish', () => {
  const pathFile1 = getFixturePath('file1.yaml');
  const pathFile2 = getFixturePath('file2.yml');
  const data1 = parsers(pathFile1);
  const data2 = parsers(pathFile2);
  const pathExpectedFile = getFixturePath('expected_stylish');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const diff = getAST(data1, data2);
  expect(stylish(diff)).toEqual(expectedResult);
});

test('parsers JSON plain', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const data1 = parsers(pathFile1);
  const data2 = parsers(pathFile2);
  const pathExpectedFile = getFixturePath('expected_plain');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const diff = getAST(data1, data2);
  expect(plain(diff)).toEqual(expectedResult);
});

test('parsers YAML plain', () => {
  const pathFile1 = getFixturePath('file1.yaml');
  const pathFile2 = getFixturePath('file2.yml');
  const data1 = parsers(pathFile1);
  const data2 = parsers(pathFile2);
  const pathExpectedFile = getFixturePath('expected_plain');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const diff = getAST(data1, data2);
  expect(plain(diff)).toEqual(expectedResult);
});
