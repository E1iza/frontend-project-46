### Hexlet tests and linter status:
[![Actions Status](https://github.com/E1iza/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/E1iza/frontend-project-46/actions)[![Maintainability](https://api.codeclimate.com/v1/badges/4fe259e856c173384cac/maintainability)](https://codeclimate.com/github/E1iza/frontend-project-46/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/4fe259e856c173384cac/test_coverage)](https://codeclimate.com/github/E1iza/frontend-project-46/test_coverage)

Утилита gendiff предназначена для построения AST-дерева изменений файла и вывода его в разных форматах.
В качестве аргументов утилита принимает пути до двух файлов.
Поддерживает форматы JSON и YAML.

Утилита поддерживает несколько форматов вывода данных:
1) stylish:
- минус означает, что значение было удалено;
- плюс означает, что значение было добавлено;
- отсутствие плюса или минуса означает, что значения по ключу совпадают.
2) plain:
- изменения файла выводится в виде текстового описания
3) json:
- выводит данные в формате json-строки.

ASCIINEMA с примером работы утилиты:
![gendiff.gif](assets%2Fgendiff.gif)