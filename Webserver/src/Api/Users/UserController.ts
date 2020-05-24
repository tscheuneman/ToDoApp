import UserService from '../../Services/UserService';
import JSONResponse from '../../Helpers/api/response/JSONResponse';
import InvalidInput from '../../Helpers/api/response/InvalidInput';
import SchemaValidator from '../../Helpers/Validators/validator';
import {UserCreateSchema} from '../../Helpers/Schemas/UsersSchema';
import Hash from 'sha.js';
/**
 * @swagger
 *
 * "/user/{id}":
 *   get:
 *     tags:
 *      - User
 *     description: Get a specified User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Object
 */
exports.getUser = async (req, res) => {
    const UserHandler = new UserService();
    const userID = req.params.id;
    if(Number.isInteger(parseInt(userID))) {
        try {
            const user = await UserHandler.find(userID);
            if(user) {
                JSONResponse(res, user);
            } else {
                InvalidInput(res, 'Invalid User ID')
            }
        } catch(err) {
            InvalidInput(res, err);
        }
    } else {
        InvalidInput(res, 'Invalid User ID');
    }
}

/**
 * @swagger
 *
 * "/user":
 *   post:
 *     tags:
 *      - User
 *     description: Create a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: username
 *         type: string
 *         required: true
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Object
 */
exports.createUser = async (req, res) => {
    const UserHandler = new UserService();
    const UserPayload = req.body;
    const isValid = SchemaValidator(UserPayload, UserCreateSchema);
    if(isValid) {
        const storedHash = Hash('sha256').update(process.env.BASE_HASH + UserPayload.username + Date.now()).digest('hex');
        const passwordHash = Hash('sha256').update(process.env.BASE_HASH + UserPayload.password + storedHash).digest('hex');
        const ConstructedPayload = {
            ...UserPayload,
            userHash: storedHash,
            password: passwordHash
        }
        const UserData = await UserHandler.insert(ConstructedPayload);
        JSONResponse(res, UserData);
    } else {
        InvalidInput(res, 'Invalid User Data');
    }
}