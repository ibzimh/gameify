const mongoose = require("mongoose");
const  choreSchema = new mongoose.Schema(
    {
        chore_name: {
            type:String,
            required: true,
        },
        description: {
            type:String,
            required: true,
        },due_date: {
            type:String,
            required: true,
        },assign_to:{
            type: Number,
            required: true
        },
        category:{
            type:Number,
            required: true
        },
        points:{
            type:Number,
            required: true
        }
    },
    {timestamps:true}
)
const Chore = mongoose.model('chore', choreSchema);
module.exports = Chore;