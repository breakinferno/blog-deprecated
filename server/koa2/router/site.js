import KoaRouter from 'koa-router'
const router = new KoaRouter();

const routes = ['publish', 'login', '', 'posts']

routes.forEach(r => {
    router.get('/' + r, async function(ctx) {
        await ctx.render('index' , {env: require('../config').isDevEnv ? 'develop' : ''});
    });
})
export default router