import Post from '../model/post'
import Tag from '../model/tag'
import Category from '../model/category'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'
import Code from '../constant/httpStatus'
import CategoryService from './category'
import TagService from './tag'
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

export default {
    Create,
    GetByID,
    DeleteById
}