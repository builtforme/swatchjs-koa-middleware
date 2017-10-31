const expect = require('chai').expect;
const swatchKoaMiddleware = require('..');

describe('index', () => {
  it('should be an object that contains helper methods', () => {
    expect(swatchKoaMiddleware).to.deep.equal({});
  });
});
