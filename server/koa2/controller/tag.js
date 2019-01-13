import TagService from '../services/tag'
import { paramHandler } from '../lib'
import Code from '../constant/httpStatus'

// 获取所有标签资源
async function GetAll(ctx) {
    await TagService.GetTags().then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

// 获取标签下文章
async function GetPosts(ctx) {
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
    await TagService.GetPosts(name).then(ret => {
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
    await TagService.Create(data).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}


async function Delete(ctx) {
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
    await TagService.Delete(name).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

export default {
    Post,
    GetAll,
    Delete,
    GetPosts
}