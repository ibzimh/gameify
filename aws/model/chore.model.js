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
        },
        points:{
            type:Number,
        },
         teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'

         }
    },
    {timestamps:true}
)
const Chore = mongoose.model('Chore', choreSchema);
module.exports = Chore;
