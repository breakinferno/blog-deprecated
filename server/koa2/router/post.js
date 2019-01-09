import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'
import validator from '../middleware/auth'

const router = new KoaRouter({
    prefix: '/posts'
})
router
    .get('/:id', controllers.Post.GetById)
    .post('/', validator(), controllers.Post.Post)
    .delete('/:id', validator(), controllers.Post.DeleteById)
    .patch('/:id', validator(), controllers.Post.Patch)

export default router