import { getConnection, Repository } from 'typeorm';
import Task from '../Models/Task';
import Category from '../Models/Category';

export default class TaskService {
    repository: Repository<Task>;
    categoryRepo: Repository<Category>;
    constructor() {
        this.repository = getConnection().getRepository(Task);
        this.categoryRepo = getConnection().getRepository(Category);
    }

    async insert(taskObj: TaskInsertDO) {
        const categoryExists : Category = await this.categoryRepo.findOne({user: taskObj.user, id: taskObj.category});
        if(categoryExists) {
          const newTask = this.repository.create({
            name: taskObj.name,
            text: taskObj.text,
            category: categoryExists
          });
          await this.repository.save(newTask);
          return newTask;
        } else {
          return false
        }
    }

    async edit(taskDetails: TaskEdit) {
      const foundElement : Task = await this.repository.findOne({ relations: ["category"], where: {id: taskDetails.id} });
      if(foundElement) {
        if(foundElement.category.user === taskDetails.user) {
          await this.repository.update(taskDetails.id, {
            name: taskDetails.name,
            text: taskDetails.text,
            category: foundElement.category
          });
          return await this.repository.findOne({select: ['id','text', 'name'], where: {id: foundElement.id}});;
        } else {
          return false;
        }
      } else {
        return false
      }
    }

    async get(user : string, id: string = null) {
      return await this.getTask(user, id);
    }
 
    async delete(taskObj : TaskDelete) : Promise<boolean> {
      const findTask = await this.getTask(taskObj.user, taskObj.id, true);
      if(findTask) {
        await this.repository.delete(taskObj.id);
        return true;
      } else {
        return false;
      }
    }

    private async getTask(user, id, single = false) : Promise<Task | Array<Task>> {
      let Tasks = await this.repository.createQueryBuilder('task')
                                       .leftJoinAndSelect("task.category", "category")
                                       .where('category.user = :user', {user});
                                       if(id) {
                                        Tasks.andWhere('task.id = :id', {id});
                                       }
      if(single) {
        return Tasks.getOne();
      }
      return Tasks.getMany();
    }

}
 