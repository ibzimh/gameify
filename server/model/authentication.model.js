const mongoose = require("mongoose");
const  authSchema = new mongoose.Schema(
    {
        user_id: {
            type:String,
        },
        auth_provider: {
            type:String,
        },
        access_token: {
            type: String,
        }
    },
    {timestamps:true}
)
const Authentication = mongoose.model('Authentication', authSchema);
module.exports = Authentication;
