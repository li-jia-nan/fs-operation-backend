'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const cors_1 = __importDefault(require('@koa/cors'));
const koa_router_1 = __importDefault(require('koa-router'));
const koa_logger_1 = __importDefault(require('koa-logger'));
const koa_bodyparser_1 = __importDefault(require('koa-bodyparser'));
const router_1 = require('./router');
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, cors_1.default)());
app.use((0, koa_logger_1.default)());
app.use((0, koa_bodyparser_1.default)());
router.get('/read', async (ctx, next) => {
  try {
    ctx.body = await (0, router_1.readRouter)(ctx);
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  } finally {
    await next();
  }
});
router.post('/create', async (ctx, next) => {
  try {
    ctx.body = await (0, router_1.createRouter)(ctx);
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  } finally {
    await next();
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080);
