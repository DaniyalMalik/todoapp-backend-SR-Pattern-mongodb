import { injectable, inject } from 'inversify';
import { UserInterfaceService } from '../interfaces/userInterface.service';
import { User } from '../../models/repoModels/User.model';
import { ResponseModel } from '../../models/repoModels/Response.model';
import IDENTIFIERS from '../../identifiers';
import { UserInterfaceRepository } from '../../repositories/interfaces/userInterface.repository';

@injectable()
export class UserService implements UserInterfaceService {
  constructor(
    @inject(IDENTIFIERS.UserRepository)
    private varUserRepository: UserInterfaceRepository,
  ) {}

  public async signUp(user: User): Promise<any> {
    const res = new ResponseModel();
    let newUser: User = new User();

    newUser = { ...newUser };

    newUser = Object.assign(newUser, user);

    const result = await this.varUserRepository.signUp(newUser);

    res.setSuccessResponseAndDataWithMessage(result, 'User registered!', true);

    return res;
  }

  //   public async signIn(id: string): Promise<any> {
  //     const res = new ResponseModel();
  //     const result = await this.varUserRepository.getUser(id);

  //     res.setSuccessResponseAndDataWithMessage(result.user, result.message, true);

  //     return res;
  //   }

  public async getUsers(): Promise<any> {
    const result = await this.varUserRepository.getUsers();
    const res = new ResponseModel();

    if (!result || result.length === 0) {
      res.setSuccessResponse('No user found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return res;
  }

  public async deleteUser(id: string): Promise<any> {
    const res = new ResponseModel();
    const result = await this.varUserRepository.deleteUser(id);

    res.setSuccessResponseAndDataWithMessage(result, 'User deleted!', true);

    return res;
  }

  public async getUser(id: string): Promise<any> {
    const result = await this.varUserRepository.getUser(id);
    const res = new ResponseModel();

    if (!result) {
      res.setSuccessResponse('No user found!', false);
    } else {
      res.setSuccessResponseAndData(result.user, result.success);
    }

    return res;
  }

  public async updateUser(id: string, user: User): Promise<any> {
    const result = await this.varUserRepository.updateUser(id, user);
    const res = new ResponseModel();

    res.setSuccessResponseAndDataWithMessage(result, 'User updated!', true);

    return res;
  }
}
