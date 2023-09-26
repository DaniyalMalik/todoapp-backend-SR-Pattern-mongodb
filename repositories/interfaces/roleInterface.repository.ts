import { Role } from '../../models/repoModels/Role.model';

export interface RoleInterfaceRepository {
  addRole(role: Role): Promise<any>;
  updateRole(role: Role, id: string, todoId: string): Promise<any>;
}
