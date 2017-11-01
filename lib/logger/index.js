import bunyan from 'bunyan';

function ensureLogger(logger) {
  // Check for a logger created by the client
  if (logger) { return logger; }

  // Otherwise create a default swatch-koa logger
  return bunyan.createLogger({
    name: 'swatch-koa',
  });
}

async function initLogger(koaCtx, next) {
  // Check the koaCtx for a koa-bunyan-logger and set on swatchCtx
  koaCtx.swatchCtx.logger = ensureLogger(koaCtx.log);

  // Continue chain of handlers
  await next();
}

module.exports = {
  init: initLogger,
};
