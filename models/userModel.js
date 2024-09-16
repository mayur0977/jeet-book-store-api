const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// name, email,photo,password,passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],

    lowercase: true, // convert data to lowercase
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true, // convert data to lowercase
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide your confirm password'],
    minlength: 8,
    validate: {
      // This only works on create and save!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ['user', 'warehouseAdmin'],
    default: 'user',
  },
});
// middleware to encrypt the password before saving the data
userSchema.pre('save', async function (next) {
  // this will only run if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  // delete passwordConfirm field before saving the data as this field is required for temporary confirmation
  this.passwordConfirm = undefined;
  next();
});

//  instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    // console.log('PASSS', JWTTimeStamp, changedTimestamp);
    return JWTTimeStamp < changedTimestamp; // it will check if issues password change called after issuing the jwt token.
  }
  // False means Not changed
  return false;
};

const User = mongoose.model('users', userSchema);
module.exports = User;
