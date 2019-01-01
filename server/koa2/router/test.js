import KoaRouter from 'koa-router'
const router = new KoaRouter()
// 路由设置test
router.get('/test', (ctx, next) => {
    ctx.body = "test page"
});

export default router