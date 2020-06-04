import categoryCreate from '../../../seeders/category.seed';
import { getConnection, Repository } from 'typeorm';

import Category from '../../Models/Category';
export default function seedThings() {
    const categorySeeder = categoryCreate;
    const cat = getConnection().getRepository(Category);

    categorySeeder.forEach(async elm => {
        const hasUser = await cat.find({id: elm.id});
        if(hasUser.length === 0) {
            const newuser = cat.create({
                ...elm,
              });
            await cat.save(newuser);
        } else {
            console.log('Category Exists');
        }

    });

}