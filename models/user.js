const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The "name" field is required.'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
    default: "John Doe",
  },
  about: {
    type: String,
    required: false,
    minlength: [2, 'The minimum length of the "about" field is 2'],
    maxlength: [30, 'The maximum length of the "about" field is 30'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (e) => isEmail(e),
      message: "Email is invalid format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
    default:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  let user = this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
  return user;
};

module.exports = mongoose.model("user", userSchema);
