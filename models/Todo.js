const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true, 
        trim: true 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    done: {
        type: Boolean, 
        default: false
    }
});

const Task = mongoose.model("Task", schema);

module.exports = Task;