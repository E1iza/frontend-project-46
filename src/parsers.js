import yaml from 'js-yaml';

const mapping = {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};

const parsers = (type, data) => mapping[type](data);

export default parsers;
