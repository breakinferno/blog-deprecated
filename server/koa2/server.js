// 引入模块
import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import auth from './middleware/auth'
import db from './db'
import routes from './router'
const app = new Koa()

const env = process.env.NODE_ENV || 'development' // Current mode

if (env === 'development') { // logger
    app.use((ctx, next) => {
        const start = new Date()
        return next().then(() => {
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
    })
}
db.start();
app.use(auth())
// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));
console.log(routes)
app.use(routes)

app.listen(4000);

console.log('graphQL server listen port: ' + 4000)
console.log('please visit the url: http://localhost:4000/test')