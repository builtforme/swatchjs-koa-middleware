const { expect } = require('chai');

const swatchKoaMiddleware = require('..');

describe('index', () => {
  it('should be an object that contains helper methods', () => {
    expect(Object.keys(swatchKoaMiddleware)).to.deep.equal(
      ['logger', 'methods', 'response'],
    );
  });
});
