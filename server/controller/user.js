const User  = require('../models/user');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const  catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, password, email, phone } = req.body;
  const isPhoneExist = await User.findOne({ phone });
  if (isPhoneExist) {
    return next(new ErrorHandler('Phone Number already taken', 422))
  }

  if (email) {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler('Email already taken', 422))
    }
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    phone
  });
  await user.save();
  sendToken(user, 200, res)
});
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('No user found this email', 422))
  }
    
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Mismatch authentication', 422))
  }
    
  sendToken(user, 200, res)
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, phone, email }= req.body;
  const id = req.params.id;

    const user = await User.findOne({ _id: id}).exec();
    if (!user) {
      return next(new ErrorHandler('No user found by this id', 422))
    }

    const isPhoneExist = await User.findOne({ phone });
    if (
      isPhoneExist &&
      phone === isPhoneExist.phone &&
      String(user._id) !== String(isPhoneExist._id)) {
      return next(new ErrorHandler('This name already exists', 422))
    }

    const isEmailExist = await User.findOne({ email });
    if (
      isEmailExist &&
      email === isEmailExist.email &&
      String(user._id) !== String(isEmailExist._id)) {
      return next(new ErrorHandler('This email already exists', 422))
    }

    user.firstName = firstName ? firstName : user.firstName;
    user.lastName = lastName ? lastName : user.lastName;
    user.phone = phone ? phone : user.phone;
    user.email = email ? email : user.email;
    

    await user.save();

    response.data.user = user;
    res.status(200).json({
      success: true,
      user
  })
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id});
  if (!user) {
    return next(new ErrorHandler('User not found by this id', 422))
  }

  user.isDelete = true;
  user.deletedAt = Date.now();
  await user.save();

  res.status(200).json({
    success: true,
    message: "Delete user Successfully"

  })
});

exports.getUsers = catchAsyncErrors(async (req, res, next) => {

    
  const users = await User.find({ isDelete: false })
  if(!users){
    return next(new ErrorHandler('User font found ', 404))
  }
  res.status(200).json({
    success: true,
    users
})
});

exports.searchUser = catchAsyncErrors(async (req, res, next) => {
  const { q } = req.body;

  let query = { isDelete: false };
  if (q !== 'undefined' || q !== undefined || q) {
    let regex = new RegExp(q, 'i');
    query = {
      ...query,
      $or: [{ firstName: regex }, { lastName: regex }, { phone: regex }, { email: regex }],
    };
  }

  const users = await User.find(query)
    .select('-__v -isDelete')
    .sort({ _id: -1 });
    res.status(200).json({
      success: true,
      users
  })
});

exports.getUser = catchAsyncErrors(async (req, res, next)=> {

  const id = req.params.id;

  const user = await User.findOne({ _id: id })
    .select('-__v -isDelete')
    .exec();
  res.status(200).json({
    success: true,
    user
  })
  
});

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
      success: true,
      user
  })
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    status: 'success',
    statusCode: 201,
    message: "Logout Successfully"
})
});