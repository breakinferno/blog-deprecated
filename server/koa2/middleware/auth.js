import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from "path"
import validatePermission from './permission'
import httpStatus from '../constant/httpStatus'
const key = fs.readFileSync(path.resolve(__dirname, '../keys/key.pub'))
let tokenName = 'access-token'
export default () => {
    // 以后可能会有其他需求
    return async (ctx, next) => {
        let token = ctx.header[tokenName]
        if (token) {
            try {
                ctx.decodedToken = jwt.verify(token, key);
                // 鉴权
                let result = validatePermission(ctx.decodedToken.privilege, ctx)
                if (result) {
                    console.log('validate permission success!')
                    await next()
                } else {
                    ctx.status = httpStatus.FORBIDDEN;
                    ctx.body = "No permission to access!";
                    return;
                }
            } catch (err) {
                // 验证失败
                console.log('your token verify is not valid ', err)
                // 重定向到登录界面
                ctx.status = httpStatus.UNAUTHORIZED;
                return;
            }
        } else {
            ctx.status = httpStatus.UNAUTHORIZED;
            return;
        }
    }
}