import compose from 'koa-compose'
import userRoutes from './user'
import testRoutes from './test'
import authRoutes from './auth'
import postRoutes from './post'
const router = compose([
    userRoutes.routes(),
    userRoutes.allowedMethods(),
    testRoutes.routes(),
    testRoutes.allowedMethods(),
    authRoutes.routes(),
    authRoutes.allowedMethods(),
    postRoutes.routes(),
    postRoutes.allowedMethods()
])
module.exports = router