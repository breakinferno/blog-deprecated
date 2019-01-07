import UserServices from '../services/user'
import { paramHandler } from '../lib'

function save() {

}

// 删除
async function Delete(target) {

}
// 获取资源
async function GetById(ctx) {
    const { id } = paramHandler(ctx, ['params'])
    if (!id) {
        ctx.response.status = 400
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await UserServices.GetByID(id).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = ret.payload
        ctx.response.status = ret.code
    })
}
// 新建资源
async function Post(ctx, next) {
    let data
    try {
        data = paramHandler(ctx)
    } catch (err) {
        console.log(err)
        return
    }
    await UserServices.Create(data).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}
// 全部更改
async function Put(target, obj) {

}
// 部分更改
async function Patch(target, fieldMap) {

}

async function DeleteById(ctx) {
    const { id } = paramHandler(ctx, ['params'])
    if (!id) {
        ctx.response.status = 400
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await UserServices.DeleteById(id).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = ret.payload
        ctx.response.status = ret.code
    })
}

export default {
    Post,
    GetById,
    DeleteById
}