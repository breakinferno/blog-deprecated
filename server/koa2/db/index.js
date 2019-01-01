import mongoose from 'mongoose'

import {
    MongoDB
} from '../config'

// mongodb连接
export default {
    start: () => {
        mongoose.connect(MongoDB.url, {
            useNewUrlParser: true
        })
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection open to ' + MongoDB.url)
        })
        mongoose.connection.on('error', console.error)

        mongoose.connection.on('disconnected', () => {
            mongoose.connect('Mongoose disconnected from ' + MongoDB.url)
        })
    }
}