import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'
import validator from '../middleware/auth'

const router = new KoaRouter({
    prefix: '/posts'
})
router
    .get('/:id', controllers.Post.GetById)
    .get('/', controllers.Post.GetByQuery)
    .post('/', validator(), controllers.Post.Post)
    .delete('/:id', validator(), controllers.Post.DeleteById)
    .delete('/tags/:name', validator(), controllers.Post.DeleteByTag)
    .delete('/category/:name', validator(), controllers.Post.DeleteByCategory)
    .patch('/:id', validator(), controllers.Post.Patch)

export default router