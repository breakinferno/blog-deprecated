import UserServices from '../services/user'
import { paramHandler } from '../lib'
import logger, {LoggerStatus} from '../lib/log'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
async function Login(ctx) {
    let data, ret
    try {
        data = paramHandler(ctx)
        ret = await UserServices.validAuth(data)
        logger(LoggerStatus.INFO, '[authController/Login]', '登录成功');
    } catch (err) {
        logger(LoggerStatus.ERROR, '[authController/Login]', '登录失败');
        ctx.body = err
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