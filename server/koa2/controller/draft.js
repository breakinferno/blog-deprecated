import PostServices from '../services/post'
import { paramHandler } from '../lib'
import Code from '../constant/httpStatus'

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
    await PostServices.GetByID(id).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

async function GetByQuery(ctx) {
    let data
    try {
        data = paramHandler(ctx, ['query'])
    } catch (err) {
        return console.log(err)
    }
    if (!data) {
        //默认pageSize 10
        data = { page: 1, size: 10 }
    }
    await PostServices.GetByQuery(data).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        console.log(err)
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

// 部分更改
async function Patch(ctx) {
    let data, payload
    try {
        data = paramHandler(ctx, ['params'])
        payload = paramHandler(ctx)
    } catch (err) {
        return console.log(err)
    }
    const { id } = data
    if (!id || payload.tags || payload.category) {
        ctx.response.status = Code.BAD_REQUEST
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await PostServices.Update(id, payload).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}





export default {
    GetById,
    GetByQuery,
    Patch,
}