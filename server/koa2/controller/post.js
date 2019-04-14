import PostServices from '../services/post'
import { paramHandler } from '../lib'
import httpStatus from '../constant/httpStatus'
import Code  from '../constant/code'
import {getLogger} from '../lib/log'

// 删除
async function Delete(target) {

}
// 获取资源
async function GetById(ctx) {
    const logger = getLogger(ctx);
    let data
    try {
        data = paramHandler(ctx, ['params'])
        const { id } = data
        if (!id) {
            return ctx.rspns.error(Code.PARAMS_INVALID, '不存在文章ID')
        }
        let ret = await PostServices.GetByID(id)
        logger.info('[PostController/GetById]', '获取文章成功')
        // console.log(ret)
        return ctx.rspns.success(ret.data)
    } catch (err) {
        logger.error('[PostController/GetById]', '获取文章成功')
        return console.log(err)
    }
    
}

async function GetByQuery(ctx) {
    const logger = getLogger(ctx);
    let data
    try {
        data = paramHandler(ctx, ['query'])
        if (!data) {
            //默认pageSize 10
            data = { page: 1, size: 10 }
        }
        let ret = await PostServices.GetByQuery(data)
        // console.log(ret)
        logger.info('[PostController/GetByQuery]', '获取文章列表成功')
        return ctx.rspns.success(ret.data)
    } catch (err) {
        logger.error('[PostController/GetByQuery]', '获取文章列表失败')
        return ctx.rspns.error(err)        
    }
}

// 新建资源
async function Post(ctx, next) {
    const logger = getLogger(ctx);
    let data
    try {
        data = paramHandler(ctx)
        const { nick } = ctx.decodedToken
        if (!nick) {
            // return ctx.body = {
            //     code: 
            //     msg: 'invalid token'
            // }
            return ctx.rspns.error(httpStatus.BAD_REQUEST, 'invalid token')
        }
        data.author = nick
        let ret = await PostServices.Create(data)
        logger.info('[PostController/Post]', '成功创建文章')
        return ctx.rspns.success(ret.data)
    } catch (err) {
        logger.error('[PostController/Post]', JSON.stringify(err))
        return ctx.rspns.error(err)
    }
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
        ctx.response.status = httpStatus.BAD_REQUEST
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
        ctx.response.status = httpStatus.BAD_REQUEST
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
        ctx.response.status = httpStatus.BAD_REQUEST
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
        ctx.response.status = httpStatus.BAD_REQUEST
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
    GetByQuery,
    DeleteById,
    Patch,
    // Put,
    DeleteByCategory,
    DeleteByTag
}