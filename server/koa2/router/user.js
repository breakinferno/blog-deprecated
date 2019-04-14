import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'
import validator from '../middleware/auth'
const router = new KoaRouter({
    prefix: '/api/users'
})
router
    .post('/', validator(), controllers.User.Post)
    .get('/:id', validator(), controllers.User.GetById)
    .delete('/:id', validator(), controllers.User.DeleteById)

export default router