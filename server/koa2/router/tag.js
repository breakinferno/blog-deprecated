import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'
import validator from '../middleware/auth'
const router = new KoaRouter({
    prefix: '/tags'
})
router
    .post('/', validator(), controllers.Tag.Post)
    .get('/', controllers.Tag.GetAll)
    .delete('/:name', validator(), controllers.Tag.Delete)

export default router