const express = require('express');
const router = express.Router();
const {todos, saveTodos, exportToCsv} = require('../data/todo');

//get all todos
router.get('/', (req, res) => {
    res.status(200).json(todos);
}); 

router.get('/export', (req, res) => {
    exportToCsv(todos);
    res.status(200).json({message: "Todos exported to todos.csv"});
});

//get a todo
router.get('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    res.status(200).json(todo);
});

//add a todo 
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1, 
        task: req.body.task, 
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
});

//mark a todo as completed or update the body 
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id)); 

    if(!todo) return res.status(404).json({message: "To Do Item Not Found"});
    todo.task = req.body.task || todo.task;

    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed; 
    saveTodos(todos)
    res.status(200).json(todo);
});

router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id)); 

    if(index === -1) return res.status(404).json({message: "To Do Item Not Found"}); 

    todos.splice(index, 1);
    saveTodos(todos);
    res.status(200).json("To Do Item Deleted");
});

module.exports = router;