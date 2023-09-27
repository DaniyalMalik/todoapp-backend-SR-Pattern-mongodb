const express = require('express');
const Todo = require('../models/repoModels/Todo.model');
const {
  TodoInterfaceService,
} = require('../services/interfaces/todoInterface.service');
const IDENTIFIERS = require('../identifiers');
const { resolve } = require('../dependencyManagement');
const { SubTodo } = require('../models/repoModels/SubTodo.model');
const { Role } = require('../models/repoModels/Role.model');

const { Router } = express;
const router = Router();

function getTodoService(): TodoInterfaceService {
  return resolve<TodoInterfaceService>(IDENTIFIERS.TodoService);
}

const todoService = getTodoService();

router.post('/', async (req: any, res: any) => {
  let todo: Todo = req.body.todo;
  let type: string = req.body.type;
  const result = await todoService.addTodo(
    todo,
    req.userId,
    type ? type : 'admin',
  );

  res.json(result);
});

router.post('/sub', async (req: any, res: any) => {
  let subTodo: SubTodo = req.body.subTodo;
  let todoId: string = req.query.todoId;
  const result = await todoService.addSubTodo(todoId, subTodo);

  res.json(result);
});

router.get('/', async (req: any, res: any) => {
  const result = await todoService.getTodos();

  res.json(result);
});

router.get('/byDone', async (req: any, res: any) => {
  let { done } = req.query;
  let boolVal: boolean = done === 'true' ? true : false;
  const result = await todoService.getTodosByDone(boolVal);

  res.json(result);
});

router.delete('/:id', async (req: any, res: any) => {
  const { id } = req.params;

  const result = await todoService.deleteTodo(id);

  res.json(result);
});

router.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const result = await todoService.getTodo(id);

  res.json(result);
});

router.put('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const todo: Todo = req.body.todo;
  const result = await todoService.updateTodo(id, todo);

  res.json(result);
});

router.post('/role', async (req: any, res: any) => {
  const type: string = req.body.type;
  const todoId: string = req.body.todoId;
  const result = await todoService.addRole(
    type ? type : 'admin',
    todoId,
    req.userId,
  );

  res.json(result);
});

router.put('/sub/:id', async (req: any, res: any) => {
  const id: string = req.params.id;
  const todoId: string = req.query.todoId;
  const subTodo: SubTodo = req.body.subTodo;
  const result = await todoService.updateSubTodo(id, todoId, subTodo);

  res.json(result);
});

router.put('/role/:id', async (req: any, res: any) => {
  const id: string = req.params.id;
  const todoId: string = req.query.todoId;
  const role: Role = req.body.role;
  const result = await todoService.updateRole(role, id, todoId);

  res.json(result);
});

module.exports = router;
