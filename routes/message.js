/*
  Path : messages/:sender
*/

const { Router } = require("express");
const { validateToken } = require("../middlewares/validate_token");
const { getMessages } = require("../controllers/message");
const router = Router();

//Validar Token
router.get("/:sender", validateToken, getMessages);

module.exports = router;
