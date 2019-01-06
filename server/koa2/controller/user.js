import UserServices from '../services/user'
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
    try {
        let data = paramHandler(ctx)
    } catch (err) {
        return
    }
    await UserServices.Create(data).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = ret.payload
        ctx.response.status = ret.code
    })
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