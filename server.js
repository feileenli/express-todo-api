require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const Todo = require('./models/todoModel.js');

const port = 3000;

app.use(express.json())

//mount the router at /todos 
app.use('/todos', todoRoutes); 

//add todo each time server starts
const addInitialTodo = async () => {
    const count = await Todo.countDocuments(); 

    if(count === 0) {
        const defaultTodo = new Todo({
            task: "Welcome to the To-Do List! Check this as completed!", 
            completed: false
        });
        await defaultTodo.save();
        console.log("Default To-Do added to MongoDB: ", defaultTodo);
    }
}

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected to MongoDB Atlas');
    await addInitialTodo(); })
    .catch(err => console.error('MongoDB Connection Error:', err));

//this starts the server 
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});
