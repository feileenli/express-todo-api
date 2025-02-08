require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//import route modules
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/auth')

const Todo = require('./models/todoModel.js');
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

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
