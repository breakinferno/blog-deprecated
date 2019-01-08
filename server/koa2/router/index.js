import compose from 'koa-compose'
import userRoutes from './user'
import testRoutes from './test'
import authRoutes from './auth'
const router = compose([
    userRoutes.routes(),
    userRoutes.allowedMethods(),
    testRoutes.routes(),
    testRoutes.allowedMethods(),
    authRoutes.routes(),
    authRoutes.allowedMethods(),
])
module.exports = router