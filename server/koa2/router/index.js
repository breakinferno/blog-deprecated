import compose from 'koa-compose'
import userRoutes from './user'
import testRoutes from './test'
const router = compose([
    userRoutes.routes(),
    userRoutes.allowedMethods(),
    testRoutes.routes(),
    testRoutes.allowedMethods(),
])
module.exports = router