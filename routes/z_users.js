var express = require('express');
var router = express.Router();
const todos = [];

router.get('/', function (req, res, next) {
  res.send(`respond with a resource`);
});

router.get('/base23', function (req, res, next) {
  res.status(202).send('base23 path anta');
});

router.get('/todos', (req, res) => {
  res.status(200).json({ data: todos, error: null });
});

router.get('/todos/:id', (req, res) => {
  res.status(200).json({ data: todos[0], error: null });
});

router.delete("/todos", (req, res) => {  
  todos.length = 0;
  res.send(200).json({data: todos, error: null});
});

router.post('/todos', (req, res) => {
  const { id, item, completed } = req.body;
  const newTodo = { id, item, completed };
  todos.push(newTodo);
  res.status(201).json({ data: todos, error: null });
});
module.exports = router;