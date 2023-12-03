const mongoose = require("mongoose");
const teamIds = {
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    role:{
        type: String,
        default: "Admin"
    },
    total_points:{
        type: Number,
        default: 0
    },
    achievement:{
        type: String,
        default:null
    },
    status:{
        type: String,
        default:"Active"
    }
}

const  userSchema = new mongoose.Schema(
    {
        user_name: {
            type:String,
        },
        teamIds: [teamIds
        ],
        email: {
            type:String,
        },dob: {
            type:String,
        },gender:{
            type: String,
        },
        password:{
            type:String
        }
    },
    {timestamps:true}
)
const User = mongoose.model('User', userSchema);
module.exports = User;
