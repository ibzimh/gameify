const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
    },
    usersList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;