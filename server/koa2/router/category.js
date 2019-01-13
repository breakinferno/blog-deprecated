import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'
import validator from '../middleware/auth'
const router = new KoaRouter({
    prefix: '/categories'
})
router
    .post('/', validator(), controllers.Category.Post)
    .get('/', controllers.Category.GetCategories)
    .get('/:name/posts', controllers.Category.GetPosts)
    .get('/:name/tags', controllers.Category.GetTags)
    .delete('/:name', validator(), controllers.Category.Delete)

export default router