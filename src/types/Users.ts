import { Users } from '../users/users.entity';

export interface UserInterface {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  date_created: Date;
}

export class AddUserResponse {
  name: Users['name'];
  username: Users['username'];
  email: Users['email'];
  surname: Users['surname'];
}

export class GetUserResponse {
  id: Users['id'];
  name: Users['name'];
  username: Users['username'];
  email: Users['email'];
  surname: Users['surname'];
  date_created: Users['date_created'];
}

export class CheckExistRespone {
  exist: boolean;
}
