import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    id: String,
    author: String,
    title: String,
    content: String,
    length: Number,
    meta: {
        like: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        },
        downloads: {
            type: Number,
            default: 0
        },
        imgUrl: {
            type: String,
            default: ''
        },
        tags: [String]
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

ArticleSchema.pre('save', function (next) {
    console.log(this.isNew)
    try {
        if (this.isNew) {
            this.createdAt = this.updatedAt = Date.now()
        } else {
            this.updatedAt = Date.now()
        }
    } catch (e) {
        console.log('[mongoose]:ArticleSchema pre save failed!')
    }
    next()
})

export default mongoose.model('Article', ArticleSchema, 'article')