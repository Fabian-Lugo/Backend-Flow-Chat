const token = require("jsonwebtoken");

const generateJWT = (uid, name, email) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, email };

    token.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          //no se crea el token
          reject("No se logro crear el token");
        } else {
          //Token
          resolve(token);
        }
      },
    );
  });
};

module.exports = {
  generateJWT,
};
