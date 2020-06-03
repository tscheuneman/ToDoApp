import express from "express";

const CategoryRoutes = require('./Category/CategoryRoutes');

const router = express.Router();

router.use('/category', CategoryRoutes);


module.exports = router;