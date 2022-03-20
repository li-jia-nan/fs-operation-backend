import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import { createRouter, readRouter } from './router';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(logger());
app.use(bodyParser());

router.get('/read', async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    ctx.body = await readRouter(ctx);
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  } finally {
    await next();
  }
});

router.post('/create', async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    ctx.body = await createRouter(ctx);
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
