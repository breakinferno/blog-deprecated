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
        if (!ret) {
            // 出错逻辑
            return
        }
        return ctx.rspns.success(ret.data)
    } catch (err) {
        logger(LoggerStatus.ERROR, '[authController/Login]', '登录失败');
        return ctx.rspns.error(err)
    }
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