const bunyan = require('bunyan');
const { expect } = require('chai');

const logger = require('../../lib/logger');

describe('logger', () => {
  it('should use the provided logger', (done) => {
    const testLogger = bunyan.createLogger({
      name: 'swatch-koa-test',
    });
    const ctx = {
      log: testLogger,
      swatchCtx: {},
    };

    logger.init(ctx, () => {
      expect(ctx.swatchCtx.logger).not.to.equal(undefined);
      expect(ctx.swatchCtx.logger.fields.name).to.equal('swatch-koa-test');

      done();
    });
  });

  it('should initialize a new shared logger', (done) => {
    const ctx = {
      swatchCtx: {},
    };
    logger.init(ctx, () => {
      expect(ctx.swatchCtx.logger).not.to.equal(undefined);
      expect(ctx.swatchCtx.logger.fields.name).to.equal('swatch-koa');

      done();
    });
  });
});
