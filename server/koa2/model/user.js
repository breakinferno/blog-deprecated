import mongoose from 'mongoose'
// import uuidv4 from 'uuid/v4'
import bcrypt from 'bcrypt'
import { getObjValue } from '../lib'
import { Common } from '../config'
// 简单的权限管理：管理员，用户级别，访客级别 以后可以把权限管理抽离出来
// scope 权限的具体修正 默认具有增改查权限
// 用户： 一个用户多个文章
const Schema = mongoose.Schema
const { privileges } = Common
const { level, scope } = privileges
const UserSchema = mongoose.Schema({
    nick: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        level: String,
        scope: [String]
    },
    avatar: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    meta: {
        gendor: {
            type: String,
            enum: ['male', 'female']
        },
        age: Number,
        location: { // 地址
            type: String
        },
        job: [String], // 职业
        hobby: [String], // 兴趣爱好
        description: String // 座右铭
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', function(next) {
    try {
        if (this.isNew) {
            this.createdAt = this.updatedAt = Date.now()
        } else {
            this.updatedAt = Date.now()
        }
        if (this.isNew || this.isModified('password')) {
            // 加密密码
            let user = this
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return next(err)
                }
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        return next(err)
                    }
                    user.password = hash
                    next()
                })
            })
        } else {
            return next()
        }
    } catch (e) {
        console.log('[mongoose]:pre save failed!')
        return next()
    }
})

UserSchema.methods.comparePassword = function(passw) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passw, this.password, (err, isMatch) => {
            if (err) {
                reject()
            }
            resolve(isMatch)
        })
    })
}

const model = mongoose.model('User', UserSchema, 'user')

export function generateUser(data = {}) {
    return new model({
        nick: data.nick,
        password: data.password || 'test',
        avatar: data.avatar || '',
        privilege: data.privilege || {
            level: level.user,
            scope: [scope.retrieve, scope.create, scope.update]
        },
        posts: [],
        meta: {
            gendor: getObjValue(data, 'meta.gendor') || 'male',
            age: getObjValue(data, 'meta.age') || 0,
            description: getObjValue(data, 'meta.description') || "init",
            job: getObjValue(data, 'meta.job') || "frontend",
            location: getObjValue(data, 'meta.location') || 'Sichuan',
            hobby: getObjValue(data, 'meta.hobby') || ['game', 'music']
        }
    })
}

export default model