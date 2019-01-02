import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'

const router = new KoaRouter({
    prefix: '/users'
})
router
    .post('/', controllers.User.Post)
    .get('/', controllers.User.Get)

export default router