import TagService from '../services/tag'
import { paramHandler } from '../lib'
import Code from '../constant/httpStatus'
import {getLogger} from '../lib/log'
// 获取所有标签资源
async function GetAll(ctx) {
    const logger = getLogger(ctx);
    try{
        let ret = await TagService.GetTags();
        logger.info('[tagController/GetAll]', '获取标签成功')
        return ctx.rspns.success(ret.data)
    }catch(err) {
        logger.error('[tagController/GetAll]', '获取标签失败')
        console.log(err)
        return ctx.rspns.error(err)
    }
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
async function Post(ctx) {
    const logger = getLogger(ctx);
    let data
    try {
        data = paramHandler(ctx)
        let ret = await TagService.Create(data)
        logger.info('[tagController/Post]', '创建标签成功')
        return ctx.rspns.success(ret.data)
    } catch (err) {
        logger.error('[tagController/Post]', '创建标签失败')
        return ctx.rspns.err(err)
    }
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