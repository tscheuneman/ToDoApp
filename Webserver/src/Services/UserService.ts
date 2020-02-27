import { Request, Response } from 'express';
import { getConnection, Repository } from 'typeorm';
import User from '../Models/User';


export class UserService {
    repository: Repository<User>;
    constructor() {
        this.repository = getConnection().getRepository(User);
    }
 
  async insert(userDetails: UserInsertDO) {
    const newuser = this.repository.create(userDetails);
    await this.repository.save(newuser);
  }

  repo() {
    return this.repository;
  }
}
 