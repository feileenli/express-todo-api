require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import route modules
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/auth')

const Todo = require('./models/todoModel.js');
const port = 3000;

const app = express();

//add todo each time server starts and there are zero tasks 
// const addInitialTodo = async () => {
//     const count = await Todo.countDocuments(); 

//     if(count === 0) {
//         const defaultTodo = new Todo({
//             task: "Welcome to the To-Do List! Check this as completed!", 
//             completed: false
//         });
//         await defaultTodo.save();
//         console.log("Default To-Do added to MongoDB: ", defaultTodo);
//     }
// }

app.use(express.json());

//mount the router at /todos 
app.use('/api', todoRoutes); 
app.use('/api', authRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected to MongoDB Atlas');
    // await addInitialTodo(); 
})
    .catch(err => console.error('MongoDB Connection Error:', err));

//this starts the server 
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});
