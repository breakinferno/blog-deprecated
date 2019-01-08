import User, { generateUser } from '../model/user'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const key = fs.readFileSync(path.resolve(__dirname, '../keys/key.pub'))

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
                return failedPromise(400, 'The user has already exist')
            }
            let model = generateUser(data)
            let ret = await model.save().then(ret => {
                return successPromise(200, "Create User Successfully!", transformDocToObj(ret, ['password', 'privilege']))
            }, err => {
                errorHandler(err)
                return failedPromise()
            })
            return ret
        } else {
            return failedPromise(422, 'require necessary field')
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
            const userdoc = await User.findOne().where('id').equals(id).exec()
            return successPromise(200, "Get User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(400, "Invalid Parameter")
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
            return successPromise(200, "Get User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}


async function validAuth({ nick, password = "" } = {}) {
    try {
        if (nick) {
            const userdoc = await User.findOne().where('nick').equals(nick).exec()
            const info = transformDocToObj(userdoc, ['password']);
            const isMatched = await userdoc.comparePassword(password)
            if (isMatched) {
                let token = jwt.sign({
                    ...info
                }, key, { expiresIn: '24h' })
                // 去掉权限参数
                delete info.privilege
                return successPromise(200, 'Valid Successfully', {
                    ...info,
                    token
                })
            } else {
                return failedPromise(200, "Incorrect Password!")
            }
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}


async function DeleteById(id) {
    try {
        if (id) {
            const userdoc = await User.findOne().where('id').equals(id).exec()
            return successPromise(200, "Delete User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(400, "Invalid Parameter")
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