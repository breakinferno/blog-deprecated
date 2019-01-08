import mongoose from 'mongoose'
import { MongoDB } from '../config'
import User, { generateUser } from '../model/user'
// mongodb连接
export default {
    start: () => {
        mongoose.connect(MongoDB.url, {
            useNewUrlParser: true
        }).then(async () => {
            // 增加管理员账号
            const { nick } = MongoDB.admin || {}
            let user = await User.findOne()
                .where('nick').equals(nick)
                .exec()
            if (!user) {
                await generateUser(MongoDB.admin).save()
            }
        }).catch(err => {
            console.log('init mongo error')
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