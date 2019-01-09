import mongoose from 'mongoose'
import { Common } from '../config'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    author: String,
    title: String,
    content: String,
    length: Number,
    overview: String,
    categories: [String],
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
        if (this.isNew || this.isModified('title') || this.isModified('content')) {
            this.length = this.content.length + this.title.length
            this.overview = this.content.length > Common.post_overview_length ? this.content.slice(Common.post_overview_length) : this.content
        }
    } catch (e) {
        console.log('[mongoose]:ArticleSchema pre save failed!')
    }
    next()
})

export default mongoose.model('Article', ArticleSchema, 'article')