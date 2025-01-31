const express = require('express');
const router = express.Router();
const { loginController, registerController } = require('../controllers/AuthController');
const { registerValidation, loginValidation } = require('../middlewares/AuthValidation');

router.post('/register', registerValidation, registerController)
router.post('/login', loginValidation, loginController)

module.exports = router;