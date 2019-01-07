import User from '../model/user'
import uuidv4 from 'uuid/v4'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
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
                return successPromise(200, "Create User Successfully!", transformDocToObj(ret))
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


async function GetByID(id) {
    try {
        if (id) {
            const userdoc = await User.findOne().where('id').equals(id).exec()
            return successPromise(200, "Get User Successfully", transformDocToObj(userdoc))
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
            return successPromise(200, "Delete User Successfully", transformDocToObj(userdoc))
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
    DeleteById
}