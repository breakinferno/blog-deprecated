import mongoose from 'mongoose'
import { MongoDB } from '../config'
import User, { generateUser } from '../model/user'
import Category from '../model/category'
import Tag from '../model/tag'
async function initDB() {
    // 增加管理员账号
    const { nick } = MongoDB.admin || {}
    let user = await User.findOne()
        .where('nick').equals(nick)
        .exec()
    if (!user) {
        console.log('try to build admin user')
        await generateUser(MongoDB.admin).save()
        console.log("build successfully")
    }
    // 创建废纸篓
    const category = await Category.findOne({ name: MongoDB.delete_category }).exec()
    if (!category) {
        console.log('try to build delete category!')
        let doc = new Category({
            name: MongoDB.delete_category,
            posts: [],
            tags: []
        })
        await doc.save()
        console.log("build delete category successfully")
    }
    //创建默认标签
    // const tag = await Tag.findOne({ name: MongoDB.delete_tag_name }).exec()
    // if (!tag) {
    //     console.log('try to build default tag!')
    //     let doc = new Tag({
    //         name: MongoDB.delete_tag_name,
    //         posts: []
    //     })
    //     await doc.save()
    //     console.log("build default tag successfully")
    // }
}

// mongodb连接
export default {
    start: () => {
        mongoose.connect(MongoDB.url, {
            useNewUrlParser: true,
            useFindAndModify: false
        }).then(async () => {
            await initDB()
        }).catch(err => {
            console.log('init mongo error')
            throw new Error(err)
        })
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection open to ' + MongoDB.url)
        })
        mongoose.connection.on('error', err => {
            console.error(err)
        })

        mongoose.connection.on('disconnected', () => {
            mongoose.connect('Mongoose disconnected from ' + MongoDB.url)
        })
    }
}