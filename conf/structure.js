import path from 'path';

const rootDir = path.resolve(path.dirname(__filename), '..');
const srcDir = path.join(rootDir, 'src');
const testDir = path.join(rootDir, 'test');

export default {
  root: rootDir,
  src: {
    root: srcDir,
    client: path.join(srcDir, 'client'),
    server: path.join(srcDir, 'server')
  },
  test: {
    root: testDir,
    client: path.join(testDir, 'client'),
    server: path.join(testDir, 'server')
  }
};
