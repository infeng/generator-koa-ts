import * as koaRouter from 'koa-router';

const indexRouter = koaRouter();
indexRouter.get('/', async (ctx, next) => {
  await ctx.render('index', {
    name: 'koa',
  });
});

export default indexRouter;
