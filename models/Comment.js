const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    date:{type: Date, required: true},
    text:{type:String, required: true},
    username: {type:String}
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;