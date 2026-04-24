const { response } = require("express");
const User = require("../models/user");

const getUsers = async (request, res = response) => {
  const users = await User.find().sort("-online");

  return res.status(200).json({
    validate: true,
    status: res.statusCode,
    message: "Users listed successfully",
    users: users,
  });
};

module.exports = {
  getUsers,
};
