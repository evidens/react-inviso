'use strict';

import componentFinder from './src/server/utils/componentFinder';
import _ from 'lodash';

let path = './test/server/fixtures/components/';
let componentList = componentFinder.findComponents(path);


console.log(_.map(componentList, function (node) { node.path = path + node.path; return node; }));

console.log('material-ui');
console.log(JSON.stringify(componentFinder.findComponents('./node_modules/material-ui/src/js'), null, 2));

console.log('bootstrap');
console.log(JSON.stringify(componentFinder.findComponents('./node_modules/react-bootstrap/src', {pattern: '**/*.js'}), null, 2));

