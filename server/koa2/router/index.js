import compose from 'koa-compose'
import userRoutes from './user'
import testRoutes from './test'
import authRoutes from './auth'
import postRoutes from './post'
import tagRoutes from './tag'
import categoryRoutes from './category'
const router = compose([
    userRoutes.routes(),
    userRoutes.allowedMethods(),
    testRoutes.routes(),
    testRoutes.allowedMethods(),
    authRoutes.routes(),
    authRoutes.allowedMethods(),
    postRoutes.routes(),
    postRoutes.allowedMethods(),
    tagRoutes.routes(),
    tagRoutes.allowedMethods(),
    categoryRoutes.routes(),
    categoryRoutes.allowedMethods()
])
module.exports = router