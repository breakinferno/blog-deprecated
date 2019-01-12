import Post from '../model/post'
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
            let ret = await post.save().then(async (ret) => {
                let p = transformDocToObj(ret)
                // 将该文章插入category 和 tags
                await CategoryService.AddPost(data.category, p.id)
                await TagService.AddPost(tags, p.id)
                return successPromise(Code.OK, "Create Post Successfully!", p)
            }).catch((err) => {
                category
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