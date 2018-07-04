import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';
import {
  HttpErrors,
  post,
  requestBody,
} from '@loopback/rest';

export class RegistrationController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) {}

  @post('/registration')
  async registerUser(@requestBody() user: User): Promise<User> {
    // Check that required fields are supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // Check that user does not already exist
    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    return await this.userRepo.create(user);
  }
}
