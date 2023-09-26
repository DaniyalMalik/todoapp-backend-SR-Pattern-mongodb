import MainInterface from './MainInterface.model';

export class User implements MainInterface {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  createdAt: number = new Date().getTime();
}
