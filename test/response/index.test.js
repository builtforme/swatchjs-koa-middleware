const bunyan = require('bunyan');
const chai = require('chai');

const response = require('../../lib/response');

const expect = chai.expect;

const logger = bunyan.createLogger({
  name: 'swatch-koa-test',
  streams: [{ path: '/dev/null' }],
});

function initSwatchCtx(onException) {
  return {
    logger,
    request: {
      onException,
    },
  };
}

describe('response', () => {
  it('should handle raw responses', () => {
    const swatchCtx = initSwatchCtx(() => {});
    const result = {
      name: 'test',
      value: 'value',
    };

    const responseBody = response.raw.call(swatchCtx, result);

    expect(responseBody).to.deep.equal(result);
  });

  it('should handle success responses', () => {
    const swatchCtx = initSwatchCtx(() => {});
    const result = {
      name: 'test',
      value: 'value',
    };

    const responseBody = response.success.call(swatchCtx, result);

    expect(responseBody).to.deep.equal({
      ok: true,
      result,
    });
  });

  it('should handle error string responses', () => {
    const error = 'error_code';
    const swatchCtx = initSwatchCtx((arg) => { throw arg; });

    const responseBody = response.error.call(swatchCtx, error);

    expect(responseBody).to.deep.equal({
      ok: false,
      error,
      details: undefined,
    });
  });

  it('should handle error object responses', () => {
    const error = 'error_code';

    const swatchCtx = initSwatchCtx((arg) => { throw arg; });
    const errorObj = new Error(error);

    const responseBody = response.error.call(swatchCtx, errorObj);

    expect(responseBody).to.deep.equal({
      ok: false,
      error,
      details: undefined,
    });
  });

  it('should handle error responses with details', () => {
    const error = 'error_code';
    const details = 'Call stack for error';

    const swatchCtx = initSwatchCtx((arg) => { throw arg; });
    const errorObj = {
      message: error,
      details,
    };

    const responseBody = response.error.call(swatchCtx, errorObj);

    expect(responseBody).to.deep.equal({
      ok: false,
      error,
      details,
    });
  });

  it('should handle error responses with mapped exceptions', () => {
    const error = 'error_code';
    const details = 'Call stack for error';

    const swatchCtx = initSwatchCtx(() => {
      throw new Error('other_error_code');
    });
    const errorObj = {
      message: error,
      details,
    };

    const responseBody = response.error.call(swatchCtx, errorObj);

    expect(responseBody).to.deep.equal({
      ok: false,
      error: 'other_error_code',
      details: undefined,
    });
  });

  it('should rescue an exception to return a value valid', () => {
    const error = 'error_code';
    const details = 'Call stack for error';
    const errorObj = {
      message: error,
      details,
    };
    const swatchCtx = initSwatchCtx(() => ('its_actually_fine'));

    const responseBody = response.error.call(swatchCtx, errorObj);

    expect(responseBody).to.deep.equal({
      ok: true,
      result: 'its_actually_fine',
    });
  });
});
