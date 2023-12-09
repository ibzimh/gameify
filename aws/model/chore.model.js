const mongoose = require("mongoose");
const  choreSchema = new mongoose.Schema(
    {
        chore_name: {
            type:String,
        },
        description: {
            type:String,
        },due_date: {
            type:String,
        },assign_to:{
            type: Number,
        },
        category:{
            type:Number,
        },
        points:{
            type:Number,
        }
    },
    {timestamps:true}
)
const Chore = mongoose.model('Chore', choreSchema);
module.exports = Chore;
