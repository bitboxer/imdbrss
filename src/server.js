import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaViews from 'koa-views';
import KoaStatic from 'koa-static';
import path from 'path';

const app = new Koa();
const router = new KoaRouter();

app.use(KoaViews(path.join(__dirname, '/../views'), {
  extension: 'ejs',
  map: {
    html: 'ejs',
  },
}));

app.use(KoaStatic('./assets'));

router.get('/', async (ctx) => {
  await ctx.render('index');
});

app
  .use(router.routes())
  .listen(process.env.PORT || 4000);
