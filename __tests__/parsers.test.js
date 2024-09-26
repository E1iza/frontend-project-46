import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import { expect, test } from '@jest/globals';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('parsers JSON stylish', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const pathExpectedFile = getFixturePath('expected_stylish');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const expectedData = getDiff(pathFile1, pathFile2, 'stylish');
  expect(expectedData).toEqual(expectedResult);
});

test('parsers YAML stylish', () => {
  const pathFile1 = getFixturePath('file1.yaml');
  const pathFile2 = getFixturePath('file2.yml');
  const pathExpectedFile = getFixturePath('expected_stylish');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const expectedData = getDiff(pathFile1, pathFile2, 'stylish');
  expect(expectedData).toEqual(expectedResult);
});

test('parsers JSON plain', () => {
  const pathFile1 = getFixturePath('file1.json');
  const pathFile2 = getFixturePath('file2.json');
  const pathExpectedFile = getFixturePath('expected_plain');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const expectedData = getDiff(pathFile1, pathFile2, 'plain');
  expect(expectedData).toEqual(expectedResult);
});

test('parsers YAML plain', () => {
  const pathFile1 = getFixturePath('file1.yaml');
  const pathFile2 = getFixturePath('file2.yml');
  const pathExpectedFile = getFixturePath('expected_plain');
  const expectedResult = fs.readFileSync(pathExpectedFile, 'utf8');
  const expectedData = getDiff(pathFile1, pathFile2, 'plain');
  expect(expectedData).toEqual(expectedResult);
});
