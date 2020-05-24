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
    return newuser;
  }


  async find(id, type : UserSearchType = 'ReadID') {
    let searchKey = 'username';
    switch(type) {
      case 'ID':
        searchKey = 'id';
        break;
      case 'ReadID':
        searchKey = 'readable_id';
        break;
    }
    return await this.repository.findOne({select: ['id', 'readable_id', 'username', 'email', 'created_at', 'updated_at'], where: {[searchKey]: id}});
  }

  async delete(id) {
    await this.repository.delete(id);
  }

  repo() {
    return this.repository;
  }
}
 