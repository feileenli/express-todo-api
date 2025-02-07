const express = require('express');
const router = express.Router();
const {todos, saveTodos, exportToCsv} = require('../data/todo');
const Todo = require('../models/todoModel');
const verifyToken = require('../middleware/auth.js');

//get all todos
router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const allTodos = await Todo.find({userId: req.user.id});
        res.status(200).json(allTodos);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}); 

//get all completed todos
router.get('/tasks/completed', verifyToken, async (req, res) => {
    try {
        const allTodos = await Todo.find({userId: req.user.id, completed: true});
        res.status(200).json(allTodos);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}); 


router.get('/export', (req, res) => {
    exportToCsv(todos);
    res.status(200).json({message: "Todos exported to todos.csv"});
});


//add a todo 
router.post('/tasks', verifyToken, async(req, res) => {
    const {task, priority, dueDate} = req.body;

    if(!task) {
        return res.status(400).json({message: "task is required"});
    }
    //formats dueDate string into type Date and checks if it's not a number 
    if(dueDate && isNaN(Date.parse(dueDate))) {
        return res.status(400).json({message: "invalid due date format. use YYYY-MM-DD or ISO 8601 format."})
    }
    try {
        const newTodo = new Todo({
            userId: req.userId,
            task,
            priority,
            completed: false,
            dueDate: dueDate ? new Date(dueDate) : null
        });
        await newTodo.save();
        res.status(201).json(newTodo); 
    } catch(e) {
        res.status(500).json({message: e.message})
    };
}
);

//mark a specific todo as completed or update the body 
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body,{new: true});
        if(!updatedTodo) {
            res.status(404).json({message: "Item not found"}); 
        } 
        res.status(200).json(updatedTodo)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if(!deletedTodo) {
            res.status(404).json({message: "Todo item not found"});
        }
        res.status(200).json({message: "Todo item deleted"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

router.delete('/', verifyToken, async (req, res) => {
    try {
        const result = await Todo.deleteMany({userId: req.user.id}); 
        res.status(200).json(`Deleted ${result.deletedCount} To-Do items`); 
    } catch (e) {
        res.status(500).json(e.message);
    }
})

module.exports = router;