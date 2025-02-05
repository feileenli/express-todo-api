const mongoose = require('mongoose');
const {Schema } = mongoose;

const todoSchema = new Schema({
    task: {type: String, required: true},
    completed: {type: Boolean, default: false},
    dueDate: Date
});

//Todo is the name for the model, a collection will be created with a name 'Todos'
const Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo;