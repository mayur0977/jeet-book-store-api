const User = require('./../models/userModel');
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  //Send response
  res.status(200).json({
    status: 'success',
    message: '',
    data: { users },
  });
});
exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined' });
};
exports.getUserById = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined' });
};
exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined' });
};
exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'this route is not defined' });
};
