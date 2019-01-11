import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 标签 比较灵活 比如js java c go python 一个分类里面有多个标签
const TagSchema = new Schema({
    name: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

TagSchema.pre('save', function(next) {
    console.log(this.isNew)
    try {
        if (this.isNew) {
            this.createdAt = this.updatedAt = Date.now()
        } else {
            this.updatedAt = Date.now()
        }
    } catch (e) {
        console.log('[mongoose]:TagSchema pre save failed!')
    }
    next()
})

export default mongoose.model('Tag', TagSchema, 'tag')