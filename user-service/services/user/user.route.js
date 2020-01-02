const express = require('express');
const router = express.Router();

const userController = require('./user.controller');


router.post('/', userController.create);
router.get('/', userController.list);



module.exports = router;