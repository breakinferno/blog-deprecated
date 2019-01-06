import User from '../model/user'
import uuidv4 from 'uuid/v4'
import {
    transformDocToObj,
    getObjValue,
    errorHandler,
    checkFields
} from '../lib'
// 新建资源
async function Create(data) {
    let nick
    try {
        if (checkFields(data, ['nick'])) {
            nick = getObjValue(data, 'nick')
            const userDoc = await User.findOne()
                .where('nick').equals(nick)
                .exec((err, user) => {
                    if (err) errorHandler(err)
                })
            if (userDoc) {
                return Promise.reject({
                    code: 400,
                    payload: {
                        msg: 'The user has already exist'
                    }
                })
            }
            let model = new User({
                id: uuidv4(),
                nick: nick,
                avatar: data.avatar || '',
                meta: {
                    gendor: getObjValue(data, 'meta.gendor') || 'male',
                    age: getObjValue(data, 'meta.age') || 0,
                    description: getObjValue(data, 'meta.description') || "init",
                    job: getObjValue(data, 'meta.job') || "frontend",
                    location: getObjValue(data, 'meta.location') || 'Sichuan',
                    hobby: getObjValue(data, 'meta.hobby') || ['game', 'music']
                }
            })
            let ret = await model.save().then(ret => {
                return {
                    code: 200,
                    payload: {
                        msg: "Create User Successfully!",
                        data: ret
                    }
                }
            }, err => {
                errorHandler(err)
                return Promise.reject({
                    code: 500,
                    payload: {
                        msg: "Internal error, save failed"
                    }
                })
            })
            return ret
        } else {
            return Promise.reject({
                code: 422,
                payload: {
                    msg: 'require necessary filed'
                }
            })
        }
    } catch (err) {
        errorHandler(err);
        return Promise.reject({
            code: 500,
            payload: {
                msg: 'Internal Error!'
            }
        })
    }
}


async function GetByID(id) {
    if (id) {
        const userdoc = await User.findOne().where('id').equals(id).exec()
        return {
            code: 200,
            payload: {
                msg: "Get User Successfully",
                data: transformDocToObj(userdoc)
            }
        };
    }
    return {
        code: 400,
        payload: {
            msg: "Invalid Parameter"
        }
    }
}

async function DeleteById(id) {
    if (id) {
        const userdoc = await User.findOneAndDelete().where('id').equals(id).exec()
        return {
            code: 200,
            payload: {
                msg: "Delete User Successfully",
                data: transformDocToObj(userdoc)
            }
        };
    }
    return {
        code: 400,
        payload: {
            msg: "Invalid Parameter"
        }
    }
}

export default {
    Create,
    GetByID,
    DeleteById
}