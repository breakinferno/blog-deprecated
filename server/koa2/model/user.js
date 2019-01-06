import mongoose from 'mongoose'
import uuidv4 from 'uuid/v4'
const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true,
        trim: true
    },
    avatar: String,
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
    console.log(this.isNew)
    try {
        if (this.isNew) {
            this.createdAt = this.updatedAt = Date.now()
        } else {
            this.updatedAt = Date.now()
        }
    } catch (e) {
        console.log('[mongoose]:pre save failed!')
    }
    next()
})

const model = mongoose.model('User', UserSchema, 'user')

export const origin = new model({
    id: uuidv4(),
    nick: 'origin',
    avatar: '',
    meta: {
        gendor: ['female', 'male'][Math.floor(Math.random() * 2)],
        age: 18,
        description: 'day day up',
        job: ['frontend'],
        location: 'Sichuan',
        hobby: ['game']
    }
})

export default model