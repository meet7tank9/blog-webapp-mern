const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        enum: ['Agriculture', "Business", "Entertainment", "Education", "Art", "Investment", "Uncategorized", "Weather"],
        message: "{Value is not supported}",
        require: true
    },
    description: {
        type: String,
        require: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    thumbnail: {
        type: String,
        ref: "User"
    }
}, { timestamps: true })

module.exports = model("Post", postSchema)