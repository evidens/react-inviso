'use strict';
import glob from 'glob';
import fs from 'fs';
import acorn from 'acorn-jsx';
import _ from 'lodash';
import path from 'path';

const PARSE_OPTIONS = {ecmaVersion: 6, plugins: {jsx: true}};

const componentFinder = {
  /**
   * @param {string} searchPath root path to search for components
   * @param {string} pattern a glob pattern of file types to search (defaults to recursive jsx search)
   */
  findComponents (searchPath='./', pattern='**/*.jsx') {
    let components = glob.sync(pattern, {cwd: searchPath});
    return components.map(function (componentFile) {
      let code = fs.readFileSync(path.join(searchPath, componentFile), 'utf8');
      let tree = componentFinder.parseJsx(code);

      let className = _(tree.body)
        .where({type: 'ClassDeclaration'})
        .pluck(['id', 'name'])
        .first();

      return {name: className, path: componentFile};
    });
  },
  parseJsx (code) {
    return acorn.parse(code, PARSE_OPTIONS);
  }
};

export default componentFinder;
