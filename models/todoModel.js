const mongoose = require('mongoose');
const {Schema } = mongoose;

const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    task: {
        type: String, 
        required: true
    },
    priority: {
        type: String, 
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    completed: {
        type: Boolean, 
        default: false
    },
    dueDate: Date
}, {timestamps: true});

//Todo is the name for the model, a collection will be created with a name 'Todos'
const Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo;