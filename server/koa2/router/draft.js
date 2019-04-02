import KoaRouter from 'koa-router'
import controllers from '../controller/draft.js'
import validator from '../middleware/auth'

const router = new KoaRouter({
    prefix: '/draft'
})
router
    .get('/:id', controllers.Post.GetById)
    .get('/', controllers.Post.GetByQuery)
    .patch('/:id', validator(), controllers.Post.Patch)

export default router