import { User } from '../../models/repoModels/User.model';

export interface UserInterfaceService {
  signUp(user: User): Promise<any>;
  // signIn(id: string): Promise<any>;
  getUsers(): Promise<any>;
  deleteUser(id: string): Promise<any>;
  getUser(id: string): Promise<any>;
  updateUser(id: string, user: User): Promise<any>;
}
