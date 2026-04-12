/*
  Path : auth/sigin && auth/signup && auth/refresh
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { signInUser, signUpUser, refreshToken } = require('../controllers/auth');
const { validateToken } = require('../middlewares/validate_token');
const router = Router();

router.post('/signin', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validateFields,
] ,signInUser);

router.post('/signup', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validateFields,
] ,signUpUser);

//Validar Token
router.get('/refresh', validateToken, refreshToken)

module.exports = router;