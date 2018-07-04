import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';
import {
  HttpErrors,
  post,
  requestBody,
} from '@loopback/rest';

export class LoginController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) {}

  @post('/login')
  async loginUser(@requestBody() user: User): Promise<User> {
    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    return await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    });
  }
}
