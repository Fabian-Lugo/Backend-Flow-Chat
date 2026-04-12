const token = require('jsonwebtoken');

const generateJWT = (uid, name, email) => {
  return new Promise((resolve, reject) => {
    const payload = {uid, name, email};

    token.sign(payload, process.env.JWT_KEY, {
      expiresIn: '12h',
    }, (err, token) => {
      if (err){
          //no se creo el token
          reject('No se pudo generar el Token')
      } else {
          //Token
          resolve(token)
      }
    })
  })
}

module.exports = {
    generateJWT
}