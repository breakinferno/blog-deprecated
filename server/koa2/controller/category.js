import CategoryService from '../services/category'
import { paramHandler } from '../lib'
import Code from '../constant/httpStatus'
import {getLogger} from '../lib/log'
// 获取资源
async function GetCategories(ctx) {
    const logger = getLogger(ctx);

    try{
        let ret = await CategoryService.GetCategories();
        logger.info('[categoryController/GetCategories]', '获取分类成功')
        return ctx.rspns.success(ret.data)
    }catch(err) {
        logger.error('[categoryController/GetCategories]', '获取分类失败')
        console.log(err)
        return ctx.rspns.error(err)
    }
}

// 获取资源
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
    await CategoryService.GetPosts(name).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}

// 获取资源
async function GetTags(ctx) {
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
    await CategoryService.GetTags(name).then(ret => {
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
        let ret = await CategoryService.Create(data)
        logger.info('[categoryController/Post]', '创建分类成功')
        return ctx.rspns.success(ret.data)
    } catch (err) {
        logger.error('[categoryController/Post]', '创建分类失败')
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
    await CategoryService.Delete(name).then(ret => {
        ctx.body = ret.payload
    }).catch(err => {
        ctx.body = err.payload
        ctx.response.status = err.code
    })
}



export default {
    Post,
    GetCategories,
    Delete,
    GetPosts,
    GetTags
}