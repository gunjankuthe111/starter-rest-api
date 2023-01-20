const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  }
);

const User = mongoose.model("person", schema);

module.exports = User;
