const express = require('express');
const validator = require('../../shared/libs/helpers/validators')
const router = express.Router();

const authController = require('./auth.controller');

router.post('/login', authController.login);



module.exports = router;