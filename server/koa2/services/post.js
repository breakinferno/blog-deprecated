import Post from '../model/post'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'

// 新建资源
async function Create(data) {
    try {
        if (checkFields(data, ['author', 'title'])) {
            let post = new Post({
                author: data.author,
                title: data.title,
                content: data.content || '',
                categories: ['default']
            })
            let ret = await post.save().then((ret) => {
                return successPromise(200, "Create Post Successfully!", transformDocToObj(ret))
            }).catch((err) => {
                errorHandler(err)
                return failedPromise()
            });
            return ret
        } else {
            return failedPromise(422, 'require necessary field')
        }
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 获取资源
async function GetByID(id) {
    try {
        if (id) {
            const userdoc = await Post.findById(id).exec()
            return successPromise(200, "Get User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}
// 获取资源
async function GetByNick(nick = '') {
    try {
        if (nick) {
            const userdoc = await Post.findOne().where('nick').equals(nick).exec()
            return successPromise(200, "Get User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

async function DeleteById(id) {
    try {
        if (id) {
            const userdoc = await Post.DeleteById(id).exec()
            return successPromise(200, "Delete User Successfully", transformDocToObj(userdoc, ['password', 'privilege']))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

export default {
    Create,
    GetByID,
    GetByNick,
    DeleteById
}