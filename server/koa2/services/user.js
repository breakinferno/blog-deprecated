import User, { generateUser } from '../model/user'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const key = fs.readFileSync(path.resolve(__dirname, '../keys/key.pub'))
import Code from '../constant/httpStatus'

// 新建资源
async function Create(data) {
    let nick
    try {
        if (checkFields(data, ['nick'])) {
            nick = getObjValue(data, 'nick')
            const userDoc = await User.findOne()
                .where('nick').equals(nick)
                .exec()
            if (userDoc) {
                return failedPromise(Code.EXISTED, 'The user has already exist')
            }
            let model = generateUser(data)
            let ret = await model.save().then(ret => {
                return successPromise(Code.OK, "Create User Successfully!", transformDocToObj(ret, ['password', 'privilege']))
            }, err => {
                errorHandler(err)
                return failedPromise()
            })
            return ret
        } else {
            return failedPromise(Code.BAD_REQUEST, 'require necessary field')
        }
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 获取资源
async function GetByID(id) {
    try {
        if (id) {
            const userdoc = await User.findById(id).exec()
            return successPromise(Code.OK, "Get User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}
// 获取资源
async function GetByNick(nick = '') {
    try {
        if (nick) {
            const userdoc = await User.findOne().where('nick').equals(nick).exec()
            return successPromise(Code.OK, "Get User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}


/**
 * 校验密码是否正确
 * @param {*} [{ nick, password = "" }={}] 昵称 密码
 * @returns Promise
 */
async function validAuth({ nick, password = "" } = {}) {
    try {
        if (nick) {
            const userdoc = await User.findOne().where('nick').equals(nick).exec()
            if (!userdoc) {
                return failedPromise(Code.NOT_FOUND, 'no user found!')
            }
            const info = transformDocToObj(userdoc, ['password']);
            const isMatched = await userdoc.comparePassword(password)
            if (isMatched) {
                // 删除部分不必要信息
                delete info.posts
                delete info.updatedAt
                delete info.createdAt
                delete info.id
                let token = jwt.sign({
                    ...info
                }, key, { expiresIn: '48h' })
                // 去掉权限参数
                delete info.privilege
                return successPromise(Code.OK, 'Valid Successfully', {
                    ...info,
                    token,
                    duration: +(Date.now() + 48 * 60 * 60 * 1000)
                })
            } else {
                return failedPromise(Code.ACCEPTED, "Incorrect Password!")
            }
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}


async function DeleteById(id) {
    try {
        if (id) {
            const userdoc = await User.findByIdAndRemove(id).exec()
            return successPromise(Code.OK, "Delete User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

export default {
    Create,
    GetByID,
    GetByNick,
    validAuth,
    DeleteById
}