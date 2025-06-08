const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    from : {
        type: String,
        required: true
    },
    to : {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        maxLength: 500
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }
})

//create the model
const Chat = mongoose.model('Chat', chatSchema);

//export the model
module.exports = Chat;