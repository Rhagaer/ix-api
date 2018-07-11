import { UserRepository } from "../repositories/user.repository";
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<any>>;
    getUser(id: number): Promise<any>;
}
