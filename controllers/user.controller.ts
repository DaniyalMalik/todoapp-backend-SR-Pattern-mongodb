const express = require('express');
const User = require('../models/repoModels/User.model');
const {
  UserInterfaceService,
} = require('../services/interfaces/userInterface.service');
const IDENTIFIERS = require('../identifiers');
const { resolve } = require('../dependencyManagement');

const { Router } = express;
const router = Router();

function getUserService(): UserInterfaceService {
  return resolve<UserInterfaceService>(IDENTIFIERS.UserService);
}

const userService = getUserService();

router.post('/', async (req: any, res: any) => {
  let user: User = req.body.user;

  const result = await userService.signUp(user);

  res.json(result);
});

// router.get('/login', async (req: any, res:any) => {
//   const id: string = req.query.id;
//   const result = await userService.signIn(id);

//   res.json(result);
// });

router.get('/', async (req: any, res: any) => {
  const result = await userService.getUsers();

  res.json(result);
});

router.delete('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);

  res.json(result);
});

router.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const result = await userService.getUser(id);

  res.json(result);
});

router.put('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const user: User = req.body.user;
  const result = await userService.updateUser(id, user);

  res.json(result);
});

module.exports = router;
