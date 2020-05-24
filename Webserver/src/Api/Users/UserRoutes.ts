import express from "express";

const UserController = require('./UserController');

const router = express.Router();

router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);

module.exports = router;