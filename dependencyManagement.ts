import 'reflect-metadata';
import IDENTIFIERS from './identifiers';
import { Container } from 'inversify';
import { TodoInterfaceService } from './services/interfaces/todoInterface.service';
import { UserInterfaceService } from './services/interfaces/userInterface.service';
import { TodoInterfaceRepository } from './repositories/interfaces/todoInterface.repository';
import { UserInterfaceRepository } from './repositories/interfaces/userInterface.repository';
import { RoleInterfaceRepository } from './repositories/interfaces/roleInterface.repository';
import { TodoService } from './services/implementations/todo.service';
import { UserService } from './services/implementations/user.service';
import { TodoRepository } from './repositories/implementations/todo.repository';
import { UserRepository } from './repositories/implementations/user.repository';
import { RoleRepository } from './repositories/implementations/role.repository';

let container = new Container();

container.bind<TodoInterfaceService>(IDENTIFIERS.TodoService).to(TodoService);
container.bind<UserInterfaceService>(IDENTIFIERS.UserService).to(UserService);
container
  .bind<TodoInterfaceRepository>(IDENTIFIERS.TodoRepository)
  .to(TodoRepository);
container
  .bind<UserInterfaceRepository>(IDENTIFIERS.UserRepository)
  .to(UserRepository);
container
  .bind<RoleInterfaceRepository>(IDENTIFIERS.RoleRepository)
  .to(RoleRepository);

export function resolve<T>(type: symbol): T {
  return container.get<T>(type);
}
