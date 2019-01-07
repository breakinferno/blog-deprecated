import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'

const router = new KoaRouter({
    prefix: '/posts'
})
router
    .get('/:id', controllers.Post.GetById)
    .post('/', controllers.Post.Post)
    .delete('/:id', controllers.Post.DeleteById)

export default router