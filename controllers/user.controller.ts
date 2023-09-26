import * as express from 'express';
import { User } from '../models/repoModels/User.model';
import { UserInterfaceService } from '../services/interfaces/userInterface.service';
import IDENTIFIERS from '../identifiers';
import { resolve } from '../dependencyManagement';

const { Router } = express;
const router = Router();

function getUserService(): UserInterfaceService {
  return resolve<UserInterfaceService>(IDENTIFIERS.UserService);
}

const userService = getUserService();

router.post('/', async (req, res) => {
  let user: User = req.body.user;

  const result = await userService.signUp(user);

  res.json(result);
});

// router.get('/login', async (req: any, res) => {
//   const id: string = req.query.id;
//   const result = await userService.signIn(id);

//   res.json(result);
// });

router.get('/', async (req, res) => {
  const result = await userService.getUsers();

  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);

  res.json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUser(id);

  res.json(result);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user: User = req.body.user;
  const result = await userService.updateUser(id, user);

  res.json(result);
});

module.exports = router;
