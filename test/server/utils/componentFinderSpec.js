'use strict';
import _ from 'lodash';
import { expect } from 'chai';
import path from 'path';
import componentFinder from '../../../src/server/utils/componentFinder';


describe('[server/utils/componentFinder]', function () {
  describe('findComponents', function () {
    it('Should find an ES6 component and path', function () {
      const componentName = 'TestComponent';
      let components = componentFinder.findComponents(path.resolve(__dirname, '../fixtures/components/'));

      let componentInfo = _.where(components, {name: componentName})[0];
      expect(componentInfo).to.eql({name: componentName, path: 'TestComponent.jsx'});
    });

    it('Should find the classname for React.createClass style component', function () {
      const componentName = 'TestOldComponent';
      let components = componentFinder.findComponents(path.resolve(__dirname, '../fixtures/components/'));

      let componentInfo = _.where(components, {name: componentName})[0];
      expect(componentInfo).to.eql({name: componentName, path: 'TestOldComponent.jsx'});
    });
  });
});
