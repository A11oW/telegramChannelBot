const _ = require('lodash');
const fsp = require('fs-promise');
import { log } from '../debug';

module.exports = function RenderFile(path, props) {
  return new Promise((resolve, reject) => {
    fsp.readFile(path, { encoding: 'utf8' }).then((string) => {
      try {
        const template = _.template(string);
        const html = template(props);
        resolve(html);
      } catch (error) {
        log(new Date(), 'template error ', error);
        reject(error);
      }
    }, (error) => {
      log(new Date(), 'can not read file ', error);
      reject(error);
    });
  });
};
