import { Users } from '../users.entity';

export class AddUserDto {
  name: Users['name'];
  username: Users['username'];
  password: Users['password'];
  email: Users['email'];
  surname: Users['surname'];
}
