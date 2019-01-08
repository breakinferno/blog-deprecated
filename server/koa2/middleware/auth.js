import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from "path"
const key = fs.readFileSync(path.resolve(__dirname, '../keys/key.pub'))
export default () => {
    // 以后可能会有其他需求
    return async (ctx, next) => {
        let token = ctx.header['access-token']
        if (token) {
            try {
                ctx.decodedToken = jwt.verify(token, key);
            } catch (err) {
                // 验证失败
                console.log('your token verify is not valid ', err)
                // 重定向到登录界面
                // ctx.redirect('/login')
                ctx.body = {
                    msg: "failed validator"
                }
                return
            }
        } else {
            // ctx.redirect('/login')
        }
        await next()
    }
}