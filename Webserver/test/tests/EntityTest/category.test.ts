import CategoryService from '../../../src/Services/CategoryService';
import {createConnection, getConnection} from "typeorm";
import ormConfig from '../../../ormconfig.test';
import Category from '../../../src/Models/Category';

let connection;
let CategoryHelper = null;
let repo = null;
let userCreate = {
    id: null,
    slug: 'test-cat',
    name: "Test Cat",
    user: '9636becf-b1d0-4933-ac16-e01494e2c230'
}

export const CategoryTests = () => {
    beforeAll(async () => {
        connection = await createConnection(ormConfig);
        CategoryHelper = new CategoryService();
    });

    test('Delete all Previous Entries', async() => {
        await getConnection().createQueryBuilder().delete().from(Category).execute();
    });
    
    test('Create A Category', async () => {
        const returnCategory = await CategoryHelper.insert(userCreate);
        userCreate['id'] = returnCategory.id;
        expect(returnCategory.slug).toEqual(userCreate.slug);
        expect(returnCategory.name).toEqual(userCreate.name);
        expect(returnCategory.user).toEqual(userCreate.user);
    });

    test('Find a Category', async() => {
        const returnCategory = await CategoryHelper.get(userCreate.user, userCreate.slug);
        expect(returnCategory.slug).toEqual(userCreate.slug);
        expect(returnCategory.name).toEqual(userCreate.name);
    });

    test('Delete a Category', async() => {
        const deletedCategories = await CategoryHelper.delete({user: userCreate.user, id:userCreate.id});
        expect(deletedCategories).toEqual(true);
    });

    afterAll(async () => {
        await connection.close();
    });
}