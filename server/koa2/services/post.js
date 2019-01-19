import Post from '../model/post'
import Tag from '../model/tag'
import Category from '../model/category'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import Code from '../constant/httpStatus'
import CategoryService from './category'
import TagService from './tag'
import logger from '../lib/log'
// 新建资源 必须提供author title category tags
async function Create(data) {
    try {
        if (checkFields(data, ['author', 'title', 'category', 'tags'])) {
            // 校验分类
            let catdoc = await Category.findOne({ name: getObjValue(data, 'category') }).exec()
            if (!catdoc) {
                return failedPromise(Code.BAD_REQUEST, 'Category not exist!')
            }
            // 校验tags
            let tags = getObjValue(data, 'tags')
            if (!Array.isArray(tags)) {
                if (typeof tags === 'string') {
                    tags = [tags]
                } else {
                    return failedPromise(Code.BAD_REQUEST, 'Tags must be string array or just string')
                }
            }
            let state = await Promise.all(tags.map(async tag => {
                let tagdoc = await Tag.findOne({ name: tag }).exec()
                if (tagdoc) {
                    return true
                }
                return false
            })).then(res => {
                return res.every(r => r)
            })
            // 如果不存在某个tag
            if (!state) {
                return failedPromise(Code.UNPROCESSIBLE, 'Exist unknown tag(s)')
            }
            // 新建tags
            let post = new Post({
                author: data.author,
                title: data.title,
                content: data.content || '',
                category: data.category,
                tags: tags
            })
            // bug 可能在后续操作失败了但是文章仍然保存了
            let ret = await post.save().then(async (ret) => {
                let p = transformDocToObj(ret)
                // 将该文章插入category 和 tags
                try {
                    await Promise.all([CategoryService.AddPost(p), TagService.AddPost(p)])
                } catch (err) {
                    await Post.findByIdAndRemove(p.id).exec()
                }
                return successPromise(Code.OK, "Create Post Successfully!", p)
            }).catch((err) => {
                errorHandler(err)
                return failedPromise()
            });
            return ret
        } else {
            return failedPromise(Code.BAD_REQUEST, 'require necessary field')
        }
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 更新文档
async function Update(id, payload) {
    try {
        if (id) {
            const postdoc = await new Promise((resolve, reject) => {
                Post.findById(id, (err, post) => {
                    if (err) {
                        return reject("[PostService/Updage] Error: find post failed")
                    }
                    for (let key of Object.keys(payload)) {
                        post[key] = payload[key]
                    }
                    post.save((err, p) => {
                        if (err) {
                            return reject("[PostService/Updage] Error: post save failed")
                        }
                        resolve(p)
                    })
                })
            })
            return successPromise(Code.OK, "Update Post Successfully", transformDocToObj(postdoc))
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 获取资源
async function GetByID(id) {
    try {
        if (id) {
            const postdoc = await Post.findById(id).exec()
            return successPromise(Code.OK, "Get Post Successfully", transformDocToObj(postdoc))
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

/**
 *根据query 查找文章
 *createdTime: {from: 2323323, to: wew}
 * @param {*} query {createdTime(ms), updatedTime, page , size, title, author}
 * @returns
 */
async function GetByQuery(query) {
    try {
        if (query) {
            // 处理query 参数
            let conditions = {}
            let options = {}
            let startTime, endTime
            let { createdTime, updatedTime, page, size = 10, title, author } = query
            // 创建时间
            if (createdTime) {
                startTime = createdTime.from
                endTime = createdTime.to || new Date()
                if (!startTime) {
                    logger('error', 'services/GetByQuery', 'you must have a startTime')
                    throw new Error('Invalid Params in GetByQuery with services')
                }
                conditions['createdAt'] = { "$gte": startTime, "lt": endTime }
            }
            // 更新时间
            if (updatedTime) {
                startTime = updatedTime.from
                endTime = updatedTime.to || new Date()
                if (!startTime) {
                    logger('error', 'services/GetByQuery', 'you must have a startTime')
                    throw new Error('Invalid Params in GetByQuery with services')
                }
                conditions['updatedAt'] = { "$gte": startTime, "lt": endTime }
            }
            // page
            if (!page) {
                page = 1
            }
            if (page) {
                options['skip'] = (page - 1) * size
            }
            // title
            if (title) {
                conditions['title'] = new RegExp(title, 'ig')
            }
            if (author) {
                conditions['author'] = author
            }
            const postdocs = await Post.find(conditions, null, options).exec()
            let ret = postdocs.map(post => transformDocToObj(post))
            return successPromise(Code.OK, "Get Posts Successfully", ret)
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        logger('error', 'services/GetByQuery', err);
        return failedPromise()
    }
}

async function DeleteById(id) {
    try {
        if (id) {
            let post = await Post.findById(id).exec()
            await Promise.all([CategoryService.DeletePost(post), TagService.DeletePost(post)])
            const postdoc = await Post.findByIdAndRemove(id).exec()
            return successPromise(Code.OK, "Delete Post Successfully", transformDocToObj(postdoc))
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}


// 删除文章以及删除引用

async function DeleteByCategory(category) {
    try {
        if (category) {
            let categorydoc = await Category.findOne({ name: category }).exec()
            let posts = categorydoc.posts
            // 删除文章
            let ret = []
            // await Promise.all(posts.map(async id => {
            //     ret.push(id.toString())
            //     // await Post.findByIdAndDelete(post).exec()
            //     let post = await Post.findById(id).exec()
            //     await Promise.all([CategoryService.DeletePost(post), TagService.DeletePost(post)])
            //     await Post.findByIdAndRemove(id).exec()
            // }))
            for (let id of posts) {
                ret.push(id.toString())
                // await Post.findByIdAndDelete(post).exec()
                let post = await Post.findById(id).exec()
                if (post) {
                    await Promise.all([CategoryService.DeletePost(post), TagService.DeletePost(post)])
                    await Post.findByIdAndRemove(id).exec()
                } else {
                    await CategoryService.DeletePost({ id, category })
                }
            }
            return successPromise(Code.OK, `Delete Posts in ${category}  successfully`, {
                posts: ret,
                total: ret.length
            })
        }
        return failedPromise(Code.BAD_REQUEST, `Delete Posts in ${category}  failed`)
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 删除文章以及删除引用
async function DeleteByTag(tag) {
    try {
        let tagdoc = await Tag.findOne({ name: tag }).exec()
        let posts = tagdoc.posts
        // 删除文章
        let ret = []
        // await Promise.all(posts.map(async id => {
        //     ret.push(id.toString())
        //     // await Post.findByIdAndDelete(post).exec()
        //     let post = await Post.findById(id).exec()
        //     await Promise.all([CategoryService.DeletePost(post), TagService.DeletePost(post)])
        //     await Post.findByIdAndRemove(id).exec()
        // }))
        // promise all 可能导致冲突
        for (let id of posts) {
            ret.push(id.toString())
            // await Post.findByIdAndDelete(post).exec()
            let post = await Post.findById(id).exec()
            if (post) {
                await Promise.all([CategoryService.DeletePost(post), TagService.DeletePost(post)])
                await Post.findByIdAndRemove(id).exec()
            } else {
                await TagService.DeletePost({ id, tags: [tag] })
            }
        }
        return successPromise(Code.OK, `Delete Posts in ${tag}  successfully`, {
            posts: ret,
            total: ret.length
        })
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

export default {
    Create,
    GetByID,
    GetByQuery,
    DeleteById,
    DeleteByTag,
    DeleteByCategory,
    Update
}