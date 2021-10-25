const {Schema,model} = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User must have username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have password"],
  },
});

const User = model("User", userSchema);

module.exports = User;
