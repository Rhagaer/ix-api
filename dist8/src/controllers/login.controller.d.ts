import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
export declare class LoginController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    loginUser(user: User): Promise<any>;
}
