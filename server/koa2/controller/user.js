import User, {
    origin
} from '../model/user'
import {
    errHandler,
    getObjValue,
    checkFields,
    getFields,
    errorHandler,
    paramHandler
} from '../lib'

function save() {

}

// 删除
async function Delete(target) {

}
// 获取资源
async function Get(ctx) {
    ctx.body = "test user"
}
// 新建资源
async function Post(ctx, next) {
    let data = paramHandler(ctx)
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
// 全部更改
async function Put(target, obj) {

}
// 部分更改
async function Patch(target, fieldMap) {

}

export default {
    Post,
    Get
}