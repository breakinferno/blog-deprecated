import UserServices from '../services/user'
import { paramHandler } from '../lib'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
async function Login(ctx) {
    let data
    try {
        data = paramHandler(ctx)
    } catch (err) {
        return console.log(err)
    }
    let ret = await UserServices.validAuth(data).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
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