const tokenJWT = require('jsonwebtoken');

const validateToken = (request, response, next) => {
  //Leer token
  const token = request.header('x-token');
  
  if(!token) {
    return response.status(401).json({
        validate: false,
        status: response.statusCode,
        message: 'Token not found in request'
    })
  }
  
  try {
      const {uid} = tokenJWT.verify(token, process.env.JWT_KEY);
      request.uid = uid;

      next();
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: response.statusCode,
      message: "Invalid token",
    });
  }
}

module.exports = {
    validateToken
}