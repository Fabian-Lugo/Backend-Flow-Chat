const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

userSchema.method(
  "toJSON",
  function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
  },
  { timestamps: true },
);

module.exports = model("User", userSchema);
