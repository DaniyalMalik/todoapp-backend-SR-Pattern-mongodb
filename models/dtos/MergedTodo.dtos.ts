import MainInterface from '../repoModels/MainInterface.model';
import { SubTodo } from '../repoModels/SubTodo.model';
import { Role } from '../repoModels/Role.model';

export class MergedTodo implements MainInterface {
  id: string = '';
  name: string = '';
  description: string = '';
  done: boolean = false;
  subTodos: SubTodo[] = [];
  roles: Role[] = [];
  createdAt: number = new Date().getTime();
}
