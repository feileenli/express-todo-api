const express = require('express');
const app = express();
const port = 3000;

const todoRoutes = require('./routes/todoRoutes');

app.use(express.json())

//mount the router at /todos 
app.use('/todos', todoRoutes); 

//this starts the server 
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});
