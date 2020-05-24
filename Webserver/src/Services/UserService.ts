import { getConnection, Repository } from 'typeorm';
import User from '../Models/User';


export default class UserService {
    private repository: Repository<User>;
    constructor() {
        this.repository = getConnection().getRepository(User);
    }
 
  async insert(userDetails: UserInsertDO) {
    const newuser = this.repository.create(userDetails);
    await this.repository.save(newuser);
  }


  async find(id) {
    const foundUser = this.repository.find({readable_id: id});
    return foundUser;
  }

  async delete(id) {
    await this.repository.delete(id);
  }

  repo() {
    return this.repository;
  }
}
 