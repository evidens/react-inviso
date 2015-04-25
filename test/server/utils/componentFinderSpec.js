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

    it('By default, it should ignore non-components', function () {
      let components = componentFinder.findComponents(path.resolve(__dirname, '../fixtures/components/'));

      expect(components.length).to.equal(2);
    });

    it('Should show all files parsed if clean is false', function () {
      let components = componentFinder.findComponents(path.resolve(__dirname, '../fixtures/components/'), {clean: false});

      expect(components.length).to.equal(3);
      expect(components, {path: 'SomeMixin.jsx'}).to.contain({path: 'SomeMixin.jsx'});
    });
  });
});
