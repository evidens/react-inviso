'use strict';
import _ from 'lodash';
import acorn from 'acorn-babel';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import traverse from 'traverse';

const PARSE_OPTIONS = {ecmaVersion: 7, plugins: {jsx: true}};

const componentFinder = {
  /**
   * @param {string} searchPath root path to search for components
   * @param {string} pattern a glob pattern of file types to search (defaults to recursive jsx search)
   */
  findComponents (searchPath='./', pattern='**/*.jsx') {
    let components = glob.sync(pattern, {cwd: searchPath});
    return components.map(function (componentFile) {
      let code = fs.readFileSync(path.join(searchPath, componentFile), 'utf8');
      let tree;
      try {
        tree = componentFinder.parseJsx(code);
      } catch (e) {
        return {path: componentFile, error: e};
      }

      // Seek new-style class first (faster)
      let className = _(tree.body)
        .where({type: 'ClassDeclaration'})
        .pluck(['id', 'name'])
        .first();

      if (!className) {
        // Recursively search through the AST tree until we find a React.createClass being assigned to a variable
        traverse(tree.body).forEach(function (x) {
          if (x && x.type === 'VariableDeclarator') {
            if (_.get(x, 'init.callee.object.name') === 'React' &&
              _.get(x, 'init.callee.property.name') === 'createClass') {
              className = _.get(x, 'id.name');
              this.stop();
            }
          }
        });
      }

      return {name: className, path: componentFile};
    });
  },
  parseJsx (code) {
    return acorn.parse(code, PARSE_OPTIONS);
  }
};

export default componentFinder;
