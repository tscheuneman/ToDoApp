import { getConnection, Repository } from 'typeorm';
import Category from '../Models/Category';

export default class CategoryService {
    repository: Repository<Category>;
    constructor() {
        this.repository = getConnection().getRepository(Category);
    }
 
  async insert(categoryDetails: CategoryInsertDO) {
    const findThis : Category = await this.repository.findOne({user: categoryDetails.user, slug: categoryDetails.slug});
    if(!findThis) {
      const newCat = this.repository.create(categoryDetails);
      await this.repository.save(newCat);
      return newCat;
    } else {
      return false
    }
  }

  async edit(categoryDetails: CategoryEdit) {
    const foundElement : Category = await this.repository.findOne({user: categoryDetails.user, id: categoryDetails.id});
    if(foundElement) {
      await this.repository.update(categoryDetails.id, categoryDetails);
      return await this.repository.findOne({select: ['id', 'readable_id', 'slug', 'name'], where: {user: categoryDetails.user, id: categoryDetails.id}});;
    } else {
      return false
    }
  }

  async verify(categoryObj) {
    const foundElement : Category = await this.repository.findOne({user: categoryObj.user, id: categoryObj.id});
    if(foundElement) {
      return true;
    }
    return false;
   
  }

  async get(userID : string, slug = null) {
    if(slug) {
      return await this.repository.findOne({select: ['id', 'readable_id', 'slug', 'name'], where: {user: userID, slug: slug}});
    }
    return await this.repository.find({select: ['id', 'readable_id', 'slug', 'name'], where: {user: userID}});
  }

  async delete(catObj : CategoryDelete) {
    const findThis : Category = await this.repository.findOne({where : {user: catObj.user, id: catObj.id}});
    if(findThis) {
      await this.repository.delete(catObj.id);
      return true;
    } else {
      return false;
    }

  }
}
 