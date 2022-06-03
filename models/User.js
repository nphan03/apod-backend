const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{type:String, required: true},
    comments: [{type:Schema.Types.ObjectId, ref:'Comment'}]
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    UserSchema,
    User
};