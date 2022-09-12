const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
        author: {
            type: String
        },
        date_time: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String
        },
        like_count: {
            type: Number,
            default: 0
        },
        dislike_count: {
            type: Number,
            default: 0
        },
        reply: {
            type: String
        },
        reply_count: {
            type: Number,
            default: 0
        }
})

const Schema = new mongoose.Schema({
    post_title: {
        type: String
    },
    author: {
        type: String
    },
    date_time: {
        type: Date
    },
    article: {
        type: String
    },
    like_count: {
        type: Number,
        default: 0
    },
    dislike_count: {
        type: Number,
        default: 0
    },
    view_count: {
        type: Number,
        default: 0
    },
    summary: {
        type: String
    },
    image: {
        type: String
    },
    comments: [ commentSchema ],
    comment_count: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('Blog', Schema)