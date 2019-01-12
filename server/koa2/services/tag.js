import Tag from '../model/tag'
import Post from '../model/post'
import mongoose from 'mongoose'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import Code from '../constant/httpStatus'
import { MongoDB } from '../config'
// 新建tag
async function Create(data) {
    try {
        if (checkFields(data, ['name'])) {
            // 校验分类
            let tagdoc = await Tag.findOne().where('name').equals(data.name).exec()
            if (tagdoc) {
                return failedPromise(Code.EXISTED, "Tag is now exsited!")
            }
            // 新建tags
            let tag = new Tag({
                name: data.name,
                posts: [],
            })
            let ret = await tag.save().then((ret) => {
                return successPromise(Code.OK, "Create Tag Successfully!", transformDocToObj(ret))
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

// 获取标签下文章
async function GetPosts(name) {
    try {
        if (name) {
            const tagdoc = await Tag.findOne({ name }).populate('posts', '_id title author').exec()
            const postdoc = tagdoc.posts
            let ret = postdoc.map(doc => transformDocToObj(doc))
            return successPromise(Code.OK, "Get Posts Successfully", ret)
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 添加文章
async function AddPost(tags, postId) {
    if (!Array.isArray(tags)) {
        if (typeof tags === 'string') {
            tags = [tags]
        } else {
            return failedPromise(Code.BAD_REQUEST, 'Tags must be string array or just string')
        }
    }
    return Promise.all(tags.map(tag => {
        return new Promise((resolve, reject) => {
            Tag.findOne({ name: tag }, (err, doc) => {
                if (err) {
                    reject('Find Tag error')
                }
                doc.posts.concat(new mongoose.Types.ObjectId(postId))
                doc.save(((err, ret) => {
                    if (err) {
                        reject('Save Tag error')
                    }
                    resolve(res)
                }))
            })
        })
    })).catch(err => {
        console.log('[TagService/AddPost] Error:')
        console.log(err)
        throw new Error(err)
    })
}

// 获取所有目录
async function GetTags() {
    try {
        const tags = await Tag.find({}).exec()
        let ret = tags.map(tag => {
            return transformDocToObj(tag).name
        })
        return successPromise(Code.OK, "Get Tags Successfully", ret)
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 删除 需要更新所有的相关文章的目录
async function Delete(name) {
    try {
        if (name) {
            const tagdoc = await Tag.findOne({ name }).exec()
            const posts = tagdoc.posts
            if (posts) {
                await Promise.all(posts.map(async postId => {
                    await Post.findByIdAndUpdate(postId, { category: MongoDB.delete_category }).exec()
                }))
            } else {
                return failedPromise(Code.INTERNAL_ERROR, "Unknown error")
            }
            return successPromise(Code.OK, "Delete Category Successfully")
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

export default {
    Create,
    GetPosts,
    AddPost,
    GetTags,
    Delete
}