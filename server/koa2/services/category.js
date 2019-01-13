import Category from '../model/category'
import Post from '../model/post'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import Code from '../constant/httpStatus'
import { MongoDB } from '../config'
import mongoose from 'mongoose'
import config from '../config'
// 新建资源
async function Create(data) {
    try {
        if (checkFields(data, ['name'])) {
            // 校验分类
            let categoryDoc = await Category.findOne().where('name').equals(data.name).exec()
            if (categoryDoc) {
                return failedPromise(Code.EXISTED, "Category is now exsited!")
            }
            // 新建tags
            let category = new Category({
                name: data.name,
                posts: [],
                tags: []
            })
            let ret = await category.save().then((ret) => {
                return successPromise(Code.OK, "Create Category Successfully!", transformDocToObj(ret))
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

// 获取目录下文章
async function GetPosts(name) {
    try {
        if (name) {
            const categorydoc = await Category.findOne({ name }).populate('posts', '_id title author content overview').exec()
            const postdoc = categorydoc.posts
            let ret = postdoc.map(doc => transformDocToObj(doc))
            return successPromise(Code.OK, "Get Posts Successfully", ret)
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}
// 获取目录下标签
async function GetTags(name) {
    try {
        if (name) {
            const categorydoc = await Category.findOne({ name }).exec()
            // const tagdoc = categorydoc.tags
            // let ret = tagdoc.map(doc => transformDocToObj(doc))
            return successPromise(Code.OK, "Get Tags Successfully", categorydoc.tags)
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}
// 添加文章
async function AddPost({ category, id, tags }) {
    return new Promise((resolve, reject) => {
        Category.findOne({ name: category }, (err, doc) => {
            if (err) {
                reject('[CategoryService/AddPost] Error:Find Category error')
            }
            doc.posts.push(new mongoose.Types.ObjectId(id))
            doc.tags = Array.from(new Set([...doc.tags, ...tags]))
            doc.save(((err, ret) => {
                if (err) {
                    return reject('[CategoryService/AddPost] Error: Save Category error')
                }
                resolve(ret)
            }))
        })
    }).catch(err => {
        console.log('[CategoryService/AddPost] Error:')
        console.log(err)
        throw new Error(err)
    })
}
// 删除文章 更新posts字段和tags字段
async function DeletePost({ category, id, tags }) {
    return new Promise((resolve, reject) => {
        Category.findOne({ name: category }, (err, doc) => {
            if (err) {
                reject('[CategoryService/DeletePost] Error:Find Category error')
            }
            let index
            for (let i = 0; i < doc.posts.length; i++) {
                if (doc.posts[i].toString() === id) {
                    index = i
                }
            }
            doc.posts.splice(index, 1)
            // 找本目录下所有除该文章之外的tag即可
            let targetPostIds = doc.posts
            let ps = targetPostIds.map(postId => {
                return new Promise((r, j) => {
                    Post.findById(postId, (err, p) => {
                        if (err) {
                            return j()
                        }
                        if (p) {
                            return r(p.tags)
                        }
                        return r([])
                    })
                })
            })
            Promise.all(ps).then(tags => {
                let ret = []
                tags.forEach(tag => {
                    ret = [...ret, ...tag]
                })
                doc.tags = Array.from(new Set(ret))
                doc.save((err, ret) => {
                    if (err) {
                        reject('[CategoryService/DeletePost] Error: Save Category error')
                    }
                    // console.log('successfully')
                    resolve(ret)
                })
            })
        })
    }).catch(err => {
        console.log(err);
        throw new Error(err)
    })
}

// 获取所有目录
async function GetCategories() {
    try {
        const categories = await Category.find({}).exec()
        let ret = categories.map(cat => {
            return transformDocToObj(cat, ["id", 'tags', 'posts', 'createdAt', 'updatedAt']).name
        })
        return successPromise(Code.OK, "Get Post Successfully", ret)
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

// 删除 需要更新所有的相关文章的目录
async function Delete(name) {
    try {
        if (name) {
            if (name === config.delete_category) {
                return failedPromise(Code.METHOD_NOT_ALLOWED, "You can't delete the default category")
            }
            const categorydoc = await Category.findOne({ name }).exec()
            const posts = categorydoc.posts
            if (posts) {
                await Promise.all(posts.map(async postId => {
                    let p = await Post.findByIdAndUpdate(postId, { category: MongoDB.delete_category }).exec()
                    await AddPost({ category: MongoDB.delete_category, id: postId, tags: p.tags })
                }))
                await Category.findOneAndDelete({ name }).exec()
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
    GetTags,
    AddPost,
    DeletePost,
    GetCategories,
    Delete
}