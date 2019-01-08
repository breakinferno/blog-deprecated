import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from "path"
import validatePermission from './permission'
const key = fs.readFileSync(path.resolve(__dirname, '../keys/key.pub'))
export default () => {
    // 以后可能会有其他需求
    return async (ctx, next) => {
        let token = ctx.header['access-token']
        if (token) {
            try {
                ctx.decodedToken = jwt.verify(token, key);
                // 鉴权
                let result = validatePermission(ctx.decodedToken.privilege, ctx)
                if (result) {
                    console.log('validate permission success!')
                }
            } catch (err) {
                // 验证失败
                console.log('your token verify is not valid ', err)
                // 重定向到登录界面
                return ctx.redirect('/login')
            }
        } else {
            return ctx.redirect('/login')
        }
        await next()
    }
}