import express from "express";

const TaskController = require('./TaskController');

const router = express.Router();

router.post('/', TaskController.create);
router.put('/', TaskController.edit);
router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.delete('/:id', TaskController.delete);

module.exports = router;