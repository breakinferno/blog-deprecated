import UserServices from '../services/user'
import { paramHandler } from '../lib'
import Code from '../constant/httpStatus'

// 删除
async function Delete(target) {

}
// 获取资源
async function GetById(ctx) {
    let data
    try {
        data = paramHandler(ctx, ['params'])
    } catch (err) {
        return console.log(err)
    }
    const { id } = data
    if (!id) {
        ctx.response.status = Code.BAD_REQUEST
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await UserServices.GetByID(id).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}
// 新建资源
async function Post(ctx, next) {
    let data
    try {
        data = paramHandler(ctx)
    } catch (err) {
        return console.log(err)
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
    let data
    try {
        data = paramHandler(ctx, ['params'])
    } catch (err) {
        return console.log(err)
    }
    const { id } = data
    if (!id) {
        ctx.response.status = Code.BAD_REQUEST
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await UserServices.DeleteById(id).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

export default {
    Post,
    GetById,
    DeleteById
}