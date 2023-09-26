import { Todo } from '../../models/repoModels/Todo.model';
import { SubTodo } from '../../models/repoModels/SubTodo.model';
import { Role } from '../../models/repoModels/Role.model';

export interface TodoInterfaceService {
  addTodo(todo: Todo, userId: string, type: string): Promise<any>;
  addRole(type: string, todoId: string, userId: string): Promise<any>;
  addSubTodo(id: string, subTodo: SubTodo): Promise<any>;
  getTodos(): Promise<any>;
  getTodosByDone(done: boolean): Promise<any>;
  deleteTodo(id: string): Promise<any>;
  getTodo(id: string): Promise<any>;
  updateTodo(id: string, todo: Todo): Promise<any>;
  updateRole(role: Role, id: string, todoId: string): Promise<any>;
  updateSubTodo(id: string, todoId: string, subTodo: SubTodo): Promise<any>;
}
