import MainInterface from './MainInterface.model';
import { Roles } from '../../enums/enum';

export class Role implements MainInterface {
  id: string = '';
  type: Roles = Roles.admin;
  userId: string = '';
  todoId: string = '';
  createdAt: number = new Date().getTime();
}
