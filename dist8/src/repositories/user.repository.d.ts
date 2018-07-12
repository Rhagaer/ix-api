import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { User } from '../models/user.model';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
