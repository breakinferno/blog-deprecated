import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'

const router = new KoaRouter();
router
    .post('/login', controllers.Auth.Login)
    .post('/sign', controllers.Auth.Sign)
    .get('/logout', controllers.Auth.Logout)

export default router