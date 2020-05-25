import { getConnection, Repository } from 'typeorm';
import User from '../Models/User';
import {userHash, passwordHash} from '../Helpers/auth/Hasher';

export default class UserService {
    private repository: Repository<User>;
    constructor() {
        this.repository = getConnection().getRepository(User);
    }
 
  async insert(userDetails: UserInsertDO) {
    const UserHash = userHash(userDetails.username);
    let password = null;
    if(userDetails.password) {
      password = passwordHash(UserHash, userDetails.password)
    }
    const newuser = this.repository.create({
      ...userDetails,
      password,
      userHash: UserHash
    });
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
      case 'ThirdPartyID':
        searchKey = 'thirdPartyID';
    }
    return await this.repository.findOne({select: ['id', 'readable_id', 'username', 'created_at', 'updated_at'], where: {[searchKey]: id}});
  }

  async findOrCreate(userObj) {
    const User = await this.find(userObj.uniqueId, 'ThirdPartyID');
    if(User) return User;
    return await this.insert({
      username: userObj.username,
      thirdPartyID: userObj.uniqueId
    });
  }

  async delete(id) {
    await this.repository.delete(id);
  }

  repo() {
    return this.repository;
  }
}
 