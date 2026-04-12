const { validationResult } = require("express-validator");

const validateFields = (request, res, next) => {
  const error = validationResult(request);
  if (!error.isEmpty()){
    return res.status(400).json({
        errors: error.array(),
    });
  }

  next();
}

module.exports = {
    validateFields
}