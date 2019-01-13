import KoaRouter from 'koa-router'
import controllers from '../controller/index.js'
import validator from '../middleware/auth'
const router = new KoaRouter({
    prefix: '/tags'
})
router
    .post('/', validator(), controllers.Tag.Post)
    .get('/', controllers.Tag.GetAll)
    .get('/:name/posts', controllers.Tag.GetPosts)
    .delete('/:name', validator(), controllers.Tag.Delete) // 删除某个标签，移除之下所有的文章标签

export default router