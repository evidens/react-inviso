'use strict';
import componentFinder from '../../../src/server/utils/componentFinder';
import { expect } from 'chai';
import path from 'path';

describe('[server/utils/componentFinder]', function () {
  describe('findComponents', function () {
    it('Should find a component and path', function () {
      let components = componentFinder.findComponents(path.resolve(path.dirname(__filename), '../fixtures/components/'));

      expect(components[0]).to.eql({name: 'TestComponent', path: 'TestComponent.jsx'});
    });
  });
});
