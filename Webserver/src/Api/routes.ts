import express from "express";

const CategoryRoutes = require('./Category/CategoryRoutes');
const TaskRoutes = require('./Task/TaskRoutes');

const router = express.Router();

router.use('/category', CategoryRoutes);
router.use('/task', TaskRoutes);

module.exports = router;