import User from '../model/user'
import {
    transformDocToObj
} from '../lib'
// 新建资源
async function Create(data) {
    try {
        if (checkFields(data, ['nick'])) {
            let nick = getObjValue(data, 'nick')
            const userDoc = await User.findOne()
                .where('nick').equals(nick)
                .exec((err, user) => {
                    if (err) errorHandler(err)
                })
            if (userDoc) {
                ctx.body = {
                    err: 'The user has already exist'
                }
                ctx.response.status = 400
                return
            }
            // 先试试默认值
            await origin.save(function (err, user) {
                if (err) {
                    errHandler(err)
                }
            })
            ctx.body = {
                data: origin
            }
        } else {
            ctx.body = {
                err: 'require necessary filed'
            }
            ctx.response.status = 422
            return
        }
    } catch (err) {
        errHandler(err);
    }
}


async function GetByNick(nick) {
    if (nick) {
        const userdoc = await User.findOne().where('nick').equals(nick).exec()
        return transformDocToObj(userdoc);
    }
    return {}
}

export default {
    Create,
    GetByNick
}