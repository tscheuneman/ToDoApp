import SchemaValidator from '../../Helpers/Validators/validator';
import {CategoryCreateSchema, CategoryEditSchema} from '../../Helpers/Schemas/CategorySchema';

import InvalidInput from '../../Helpers/api/response/InvalidInput';
import JSONResponse from '../../Helpers/api/response/JSONResponse';
import { RedisHelper } from '../../Helpers/Redis/RedisHelper';
import CategoryService from '../../Services/CategoryService';
/**
 * @swagger
 *
 * "/":
 *   post:
 *     tags:
 *      - Category
 *     description: Create's a Category
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category Object
 */
exports.create = async (req, res) => {
    const CatPayload = req.body;
    const CategoryHelper = new CategoryService();
    if(SchemaValidator(CatPayload, CategoryCreateSchema)) {
        const Category = {
            ...CatPayload,
            user: req.user.id
        };
        try {
            const createdCategory = await CategoryHelper.insert(Category);
            if(createdCategory) {
                JSONResponse(res, createdCategory);
            } else {
                InvalidInput(res, 'That category already exists');
            }
        } catch(err) {
            let errMessage = 'Error, something went wrong';
            InvalidInput(res, errMessage);
        }

    } else {
        InvalidInput(res, 'Invalid Payload');
    }
}

/**
 * @swagger
 *
 * "/":
 *   get:
 *     tags:
 *      - Category
 *     description: Get all user categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Category Objects
 */
exports.getAll = async (req, res) => {
    const CategoryHelper = new CategoryService();
    const categories = await CategoryHelper.get(req.user.id);
    JSONResponse(res, categories);
}

/**
 * @swagger
 *
 * "/:slug":
 *   get:
 *     tags:
 *      - Category
 *     description: Returns One Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: url
 *         name: slug
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Array of Category Objects
 */
exports.getOne = async (req, res) => {
    const catSlug = req.params.slug;
    if(catSlug) {
        const CategoryHelper = new CategoryService();
        const categories = await CategoryHelper.get(req.user.id, catSlug);
        JSONResponse(res, categories);
    } else {
        InvalidInput(res, "That Category Doesn't Exist");
    }
}

/**
 * @swagger
 *
 * "/":
 *   put:
 *     tags:
 *      - Category
 *     description: Edit a Category
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category Object
 */
exports.edit = async (req, res) => {
    const CatPayload = req.body;
    const CategoryHelper = new CategoryService();
    if(SchemaValidator(CatPayload, CategoryEditSchema)) {
        const Category = {
            ...CatPayload,
            user: req.user.id
        };
        try {
            const createdCategory = await CategoryHelper.edit(Category);
            if(createdCategory) {
                JSONResponse(res, createdCategory);
            } else {
                InvalidInput(res, 'Something went wrong');
            }
        } catch(err) {
            let errMessage = 'Error, something went wrong';
            InvalidInput(res, errMessage);
        }

    } else {
        InvalidInput(res, 'Invalid Payload');
    }
}

/**
 * @swagger
 *
 * "/:id":
 *   delete:
 *     tags:
 *      - Category
 *     description: Deletes a Category
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Boolean
 */
exports.delete = async (req, res) => {
    const catId = req.params.id;
    const CategoryHelper = new CategoryService();
        const Category = {
            id: catId,
            user: req.user.id
        };
        try {
            const createdCategory = await CategoryHelper.delete(Category);
            if(createdCategory) {
                JSONResponse(res, "Deleted");
            } else {
                InvalidInput(res, 'Something went wrong');
            }
        } catch(err) {
            let errMessage = 'Error, something went wrong';
            InvalidInput(res, errMessage);
        }

}