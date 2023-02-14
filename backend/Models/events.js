const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required:true
    },
    allDay:{
        type: Boolean,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{timestamps: true});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;