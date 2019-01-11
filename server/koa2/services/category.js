import Category from '../model/category'
import { transformDocToObj, getObjValue, errorHandler, checkFields } from '../lib'
import { failedPromise, successPromise } from '../lib/p'

// 新建资源
async function Create(data) {
    try {
        if (checkFields(data, ['name'])) {
            // 校验分类
            let categoryDoc = await Category.findOne().where('name').equals(data.name).exec()
            if (categoryDoc) {
                return failedPromise(422, "category is now exsited!")
            }
            // 新建tags
            let category = new Category({
                name: data.name,
                posts: [],
                tags: []
            })
            let ret = await category.save().then((ret) => {
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

// 获取目录下文章
async function GetPosts(name) {
    try {
        if (id) {
            const postdoc = await Category.findById(id).exec()
            return successPromise(200, "Get Post Successfully", transformDocToObj(postdoc))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}
// 获取目录下标签
async function GetTags(name) {
    try {
        if (id) {
            const postdoc = await Category.findById(id).exec()
            return successPromise(200, "Get Post Successfully", transformDocToObj(postdoc))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

async function GetCategories() {
    try {
        const categories = await Category.find({}).exec()
        return successPromise(200, "Get Post Successfully", transformDocToObj(categories, ['tags', 'posts']))
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

async function Delete(name) {
    try {
        if (id) {
            const postdoc = await Category.findByIdAndRemove(id).exec()
            return successPromise(200, "Delete Post Successfully", transformDocToObj(postdoc))
        }
        return failedPromise(400, "Invalid Parameter")
    } catch (err) {
        errorHandler(err);
        return failedPromise()
    }
}

export default {
    Create,
    GetPosts,
    GetTags,
    GetCategories,
    Delete
}