//Viet
const mongoose = require("mongoose");
const  rewardSchema = new mongoose.Schema(
    {
        reward_name: {
            type:String,
        },
        description: {
            type:String,
        },
        value: {
            type: Number,
        }
    },
    {timestamps:true}
)
const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;
