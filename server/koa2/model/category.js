import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 分类：比如音乐 编程 运动 动漫 是比较固定的东西
const CategorySchema = new Schema({
    name: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

CategorySchema.pre('save', function(next) {
    try {
        if (this.isNew) {
            this.createdAt = this.updatedAt = Date.now()
        } else {
            this.updatedAt = Date.now()
        }
    } catch (e) {
        console.log('[mongoose]:CategorySchema pre save failed!')
    }
    next()
})

export default mongoose.model('Category', CategorySchema, 'category')