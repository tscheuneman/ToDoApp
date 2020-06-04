import SchemaValidator from '../../Helpers/Validators/validator';
import {TaskCreateSchema, TaskEditSchema} from '../../Helpers/Schemas/TaskSchema';

import InvalidInput from '../../Helpers/api/response/InvalidInput';
import JSONResponse from '../../Helpers/api/response/JSONResponse';
import TaskService from '../../Services/TaskService';
/**
 * @swagger
 *
 * "/":
 *   post:
 *     tags:
 *      - Task
 *     description: Create's a Task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category Object
 */
exports.create = async (req, res) => {
    const taskPayload = req.body;
    const TaskHelper = new TaskService();
    if(SchemaValidator(taskPayload, TaskCreateSchema)) {
        const taskInsert = {
            ...taskPayload,
            user: req.user.id
        };
        try {
            const createdTask = await TaskHelper.insert(taskInsert);
            if(createdTask) {
                JSONResponse(res, createdTask);
            } else {
                InvalidInput(res, 'That category doesn\'t exist');
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
 *      - Taks
 *     description: Get all user taks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Task Objects
 */
exports.getAll = async (req, res) => {
    const TaslHelper = new TaskService();
    const tasks = await TaslHelper.get(req.user.id);
    JSONResponse(res, tasks);
}

/**
 * @swagger
 *
 * "/:id":
 *   get:
 *     tags:
 *      - Category
 *     description: Returns One Task
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: url
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Array of Task Objects
 */
exports.getOne = async (req, res) => {
    const taskID = req.params.id;
    const TaslHelper = new TaskService();
    const tasks = await TaslHelper.get(req.user.id, taskID);
    JSONResponse(res, tasks);
}

/**
 * @swagger
 *
 * "/":
 *   put:
 *     tags:
 *      - Task
 *     description: Edit a Task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category Object
 */
exports.edit = async (req, res) => {
    const taskPayload = req.body;
    const TaskHelper = new TaskService();
    if(SchemaValidator(taskPayload, TaskEditSchema)) {
        const Category = {
            ...taskPayload,
            user: req.user.id
        };
        try {
            const createdCategory = await TaskHelper.edit(Category);
            if(createdCategory) {
                JSONResponse(res, createdCategory);
            } else {
                InvalidInput(res, 'Something went wrong');
            }
        } catch(err) {
            console.log(err);
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
 *     description: Deletes a Task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Boolean
 */
exports.delete = async (req, res) => {
    const taskID = req.params.id;
    const TaskHelper = new TaskService();
        const Task = {
            id: taskID,
            user: req.user.id
        };
        try {
            const deletedTask = await TaskHelper.delete(Task);
            if(deletedTask) {
                JSONResponse(res, "Deleted");
            } else {
                InvalidInput(res, 'Something went wrong');
            }
        } catch(err) {
            let errMessage = 'Error, something went wrong';
            InvalidInput(res, errMessage);
        }

}