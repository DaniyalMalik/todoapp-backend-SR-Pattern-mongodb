import MainInterface from './MainInterface.model';

export class SubTodo implements MainInterface {
  id: string = '';
  name: string = '';
  description: string = '';
  done: boolean = false;
  todoId: string = '';
  createdAt: number = new Date().getTime();
}
