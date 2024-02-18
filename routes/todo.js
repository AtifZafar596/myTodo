// routesoftodo.js
const express = require('express');
const Todo = require('../models/Todo'); // Import the Todo model

const router = express.Router();

// Routes


router.post('/add', async (req, res) => {
    console.log('request')
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description });
        await todo.save();
        res.status(201).json({ message: 'Todo added successfully', todo });
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/todos', async (req, res) => {
    try {
      
        const todos = await Todo.find();
        
        res.json(todos);
    } catch (error) {
        
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
     
        const { id } = req.params;
        
        
        await Todo.findByIdAndDelete(id);

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        
        const { id } = req.params;
        
        
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description
        }, { new: true });

        
        res.json(updatedTodo);
    } catch (error) {
        
        console.error('Error editing todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/toggle/:id', async (req, res) => {
    try {
       
        const { id } = req.params;
        
       
        const todo = await Todo.findById(id);

     
        if (todo) {
            todo.status = !todo.status; 
            await todo.save(); 
           
            res.json({ message: 'Todo status updated successfully' });
        } else {
           
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        
        console.error('Error toggling todo status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Export the router
module.exports = router;

module.exports = router;
