const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const Task = require('./models/Todo.js');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

app.get('/api/todos', async(req, res) => {
try{
    const result = await Task.find().sort({_id: -1 });
    res.json(result);
}catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});

app.post('/api/todos', async (req, res) => {
    const text = req.body.text;
    const priority = req.body.priority;
    if(!text || text.trim() === ""){
        res.status(400).json({ error: 'chyba inputu'});
        return;
    }
    const quest = {text: text, priority: priority || 'medium'};
    try{
        const newTask = await Task.create(quest);
        res.status(201).json(newTask);
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Invalid priority value', error);
            res.status(400).json({ error: 'Invalid priority value' });
            return;
        }
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
})

app.delete('/api/todos/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const deleted = await Task.findByIdAndDelete(id);
        if(deleted === null){
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.status(204).json(deleted);
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

async function startServer() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(PORT, () => {
        console.log('Server is running on http://localhost:' + PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
startServer();

