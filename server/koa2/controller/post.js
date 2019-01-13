import PostServices from '../services/post'
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
    await PostServices.GetByID(id).then(ret => {
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
    const { nick } = ctx.decodedToken
    if (!nick) {
        return ctx.body = {
            msg: 'invalid token'
        }
    }
    data.author = nick
    await PostServices.Create(data).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
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
    await PostServices.DeleteById(id).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

// 根据目录删除
async function DeleteByCategory(ctx) {
    let data
    try {
        data = paramHandler(ctx, ['params'])
    } catch (err) {
        return console.log(err)
    }
    const { name } = data
    if (!name) {
        ctx.response.status = Code.BAD_REQUEST
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await PostServices.DeleteByCategory(name).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

//根据标签删除
async function DeleteByTag(ctx) {
    let data
    try {
        data = paramHandler(ctx, ['params'])
    } catch (err) {
        return console.log(err)
    }
    const { name } = data
    if (!name) {
        ctx.response.status = Code.BAD_REQUEST
        return ctx.body = {
            msg: 'Invalid Parameter!'
        }
    }
    await PostServices.DeleteByTag(name).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

export default {
    Post,
    GetById,
    DeleteById,
    Patch,
    // Put,
    DeleteByCategory,
    DeleteByTag
}