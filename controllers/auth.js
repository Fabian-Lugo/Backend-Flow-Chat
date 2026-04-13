const { response, request } = require('express')
const { generateJWT } = require('../helpers/token')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const signInUser = async(request, res = response) => {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({email})

      if (!user){
        return res.status(400).json({
          validate: false,
          status: res.statusCode,
          message: "Account not found",
        })
      }

      // Comparar las contraseñas
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword){
        return res.status(400).json({
          validate: false,
          status: res.statusCode,
          message: "Invalid credentials",
        });
      }
      
      //Generar JWT
      const token = await generateJWT(user._id, user.name, user.email);

      res.json({
         validate: true,
         user: user,
         token: token,
       })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: res.statusCode,
        message: "Server error",
      });
    }
}

const signUpUser = async(request, res = response) => {
    const { email, password } = request.body;

    
    try {
        const emailUsed = await User.findOne({email})
        if (emailUsed) {
          return res.status(400).json({
            validate: false,
            status: res.statusCode,
            message: "Error in registration",
          })
        }

        const user = new User(request.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
  
        await user.save();

        //Generar JWT
        const token = await generateJWT(user._id, user.name, user.email)
        
        res.json({
          validate: true,
          user: user,
          token: token,
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: res.statusCode,
        message: "Server error",
      });
    }
}

const refreshToken = async(request, res = response) => {
  
  try {
      const uid = request.uid;
      const user = await User.findById(uid)
      
      if (!user) {
        return res.status(400).json({
          validate: false,
          message: "User not found",
        })
      }

      //Generar nuevo JWT
      const refreshToken = await generateJWT(user._id, user.name, user.email);

      res.json({
        validate: true,
        user: user,
        refreshToken: refreshToken,
      })

    } catch (error) {
      console.log(error);
      res.status(500).json({
          validate: false,
          message: "Server error",
      });
    }

}

module.exports = {
    signInUser,
    signUpUser,
    refreshToken,
}