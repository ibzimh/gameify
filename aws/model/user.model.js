const mongoose = require("mongoose");
const  userSchema = new mongoose.Schema(
    {
        user_name: {
            type:String,
        },
        role:{
            type:String,
        },
        email: {
            type:String,
        },
        password:{
            type:String,
        },
        dob: {
            type:String,
        },
        gender:{
            type: String,
        },
        total_point:{
            type:Number,
        },
        achievement:{
            type:String,
        },
        status:{
            type:String,
        }, 
    },
    {timestamps:true}
)
const User = mongoose.model('User', userSchema);
module.exports = User;
