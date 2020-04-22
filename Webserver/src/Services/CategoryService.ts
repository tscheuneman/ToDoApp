import { getConnection, Repository } from 'typeorm';
import Category from '../Models/Category';


export class CategoryServices {
    repository: Repository<Category>;
    constructor() {
        this.repository = getConnection().getRepository(Category);
    }
 
  async insert(categoryDetails: any) {
    const newCat = this.repository.create(categoryDetails);
    await this.repository.save(newCat);
  }

  repo() {
    return this.repository;
  }
}
 