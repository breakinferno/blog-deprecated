import Category from '../model/category'
import Post from '../model/post'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import Code from '../constant/httpStatus'
import { MongoDB } from '../config'
// 新建资源
async function Create(data) {
    try {
        if (checkFields(data, ['name'])) {
            // 校验分类
            let categoryDoc = await Category.findOne().where('name').equals(data.name).exec()
            if (categoryDoc) {
                return failedPromise(Code.EXISTED, "category is now exsited!")
            }
            // 新建tags
            let category = new Category({
                name: data.name,
                posts: [],
                tags: []
            })
            let ret = await category.save().then((ret) => {
                return successPromise(Code.OK, "Create Post Successfully!", transformDocToObj(ret))
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
            const categorydoc = await Category.find({ name }).populate('posts', '_id title author').exec()
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
            const categorydoc = await Category.find({ name }).populate('tags', '_id name').exec()
            const tagdoc = categorydoc.tags
            let ret = tagdoc.map(doc => transformDocToObj(doc))
            return successPromise(Code.OK, "Get Tags Successfully", ret)
        }
        return failedPromise(Code.BAD_REQUEST, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}
// 添加文章
async function AddPost(category, postId) {
    if (!Array.isArray(tags)) {
        if (typeof tags === 'string') {
            tags = [tags]
        } else {
            return failedPromise(Code.BAD_REQUEST, 'Tags must be string array or just string')
        }
    }
    return new Promise((resolve, reject) => {
        Category.findOne({ name: category }, (err, doc) => {
            if (err) {
                reject('[CategoryService/AddPost] Error:Find Category error')
            }
            doc.posts.concat(new mongoose.Types.ObjectId(postId))
            doc.save(((err, ret) => {
                if (err) {
                    reject('[CategoryService/AddPost] Error: Save Category error')
                }
                resolve(res)
            }))
        })
    }).catch(err => {
        console.log('[CategoryService/AddPost] Error:')
        console.log(err)
        throw new Error(err)
    })
}
// 获取所有目录
async function GetCategories() {
    try {
        const categories = await Category.find({}).exec()
        let ret = categories.map(cat => {
            return transformDocToObj(categories, ['tags', 'posts'])
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
            const categorydoc = await Category.find({ name }).exec()
            const posts = categorydoc.posts
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
    GetTags,
    AddPost,
    GetCategories,
    Delete
}