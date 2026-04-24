/*
  Path : user/list
*/

const { Router } = require("express");
const { validateToken } = require("../middlewares/validate_token");
const { getUsers } = require("../controllers/user");
const router = Router();

//Validar Token
router.get("/list", validateToken, getUsers);

module.exports = router;
