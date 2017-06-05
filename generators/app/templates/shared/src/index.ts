import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as koaBody from 'koa-body';
import * as serve from 'koa-static';
import * as path from 'path';
const render = require('koa-ejs');
import indexRouter from './routes/index';

const app = new Koa();
render(app, {
  root: path.resolve(__dirname, '../views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false,
});

app.use(logger());
app.use(koaBody());
app.use(serve(path.resolve(__dirname, '../static')));
app.use(indexRouter.routes());

app.on('error', err => {
  console.log('server error', err);
});

app.listen(3000);
