import UserServices from '../services/user'
import { paramHandler } from '../lib'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
async function Login(ctx) {
    let data, ret
    try {
        data = paramHandler(ctx)
        ret = await UserServices.validAuth(data)
        ctx.body = ret
    } catch (err) {

        ctx.body = err.payload
        ctx.response.status = err.code
        return console.log(err)
    }

    if (!ret) {
        // 出错逻辑
        return
    }
    ctx.body = ret
}
async function Sign(target) {

}
async function Logout(target) {

}

export default {
    Login,
    Logout,
    Sign
}