### Hexlet tests and linter status:
[![Actions Status](https://github.com/E1iza/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/E1iza/frontend-project-46/actions)[![Maintainability](https://api.codeclimate.com/v1/badges/4fe259e856c173384cac/maintainability)](https://codeclimate.com/github/E1iza/frontend-project-46/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/4fe259e856c173384cac/test_coverage)](https://codeclimate.com/github/E1iza/frontend-project-46/test_coverage)

Утилита gendiff предназначена для сравнения двух файлов в формате JSON.
Диф строится на основе того, как файлы изменились относительно друг друга, ключи выводятся в алфавитном порядке. Ниже пример вывода результата сравнения двух файлов:
[![asciicast](https://asciinema.org/a/Y5cBm8bSWL7PekPV7xEowlVEN.svg)](https://asciinema.org/a/Y5cBm8bSWL7PekPV7xEowlVEN)
Отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают.
Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле.