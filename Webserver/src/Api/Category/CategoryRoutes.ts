import express from "express";

const CategoryController = require('./CategoryController');

const router = express.Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:slug', CategoryController.getOne);
router.put('/', CategoryController.edit);
router.delete('/:id', CategoryController.delete);

module.exports = router;