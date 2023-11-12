const mongoose = require("mongoose");
const  userSchema = new mongoose.Schema(
    {
        user_name: {
            type:String,
        },
        email: {
            type:String,
        },dob: {
            type:String,
        },gender:{
            type: Number,
        },
        total_point:{
            type:Number,
        },
        achievement:{
            type:Number,
        },
        status:{
            type:String,
        }
    },
    {timestamps:true}
)
const User = mongoose.model('User', userSchema);
module.exports = User;
