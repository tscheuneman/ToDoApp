import express from "express";

const UserRoutes = require('./Users/UserRoutes');

const router = express.Router();

router.use('/user', UserRoutes);


module.exports = router;