import { User } from '../../models/repoModels/User.model';

export interface UserInterfaceRepository {
  signUp(user: User): Promise<any>;
  getUsers(): Promise<any>;
  deleteUser(id: string): Promise<any>;
  getUser(id: string): Promise<any>;
  updateUser(id: string, user: User): Promise<any>;
}
