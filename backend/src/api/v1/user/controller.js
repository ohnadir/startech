const { User } = require('../models');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const  catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, password, email, phone, role } = req.body;

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

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    phone, 
    role
  });
  await newUser.save();
  sendToken(newUser, res)
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Registration successful",
    token : newUser.getJwtToken()
})
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
    
  sendToken(user, res)
  res.status(200).json({
    success: true,
    message: "Log in successful"
})
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

exports.userLogoutService = catchAsyncErrors(async (req, res, next) => {
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

// Forgot Password
exports.forgotPasswordService = async ({ email, req }) => {
  const response = {
    code: 201,
    status: 'Success',
    message: 'Forgot Password token set Successfully',
  };

  try {

    const user = await User.findOne({ email });
    if (!user) {
      response.code = 422;
      response.status = 'Failed';
      response.message = 'User not Found';
      return response;
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Create reset password URL 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/password/reset/${resetToken}`
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nif you have not request this email, then ignore it.`
    if (user) {
      await sendEmail({
        email: user.email,
        subject: 'Fruits Password Recovery',
        message
      })
    }

    return response;

  }
  catch (error) {
    response.code = 500;
    response.status = 'Failed';
    response.message = 'Error. Try again';
    return response;
  }
};

exports.resetPasswordService = async ({ token, body, res }) => {
  const response = {
    code: 201,
    status: 'Success',
    message: 'Password reset Successfully',
  };

  try {

  //  Hash URL Token 
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
})
  console.log(user);
  if (!user) {
    response.code = 400;
    response.status = 'Failed';
    response.message = 'Password reset token is invalid or has been expired';
    return response;
  }

  if (body.password !== body.confirmPassword) {
    response.code = 400;
    response.status = 'Failed';
    response.message = 'Password does not match';
    return response;
  }

  // Setup new password
  user.password = body.password;
  await user.save();
  sendToken(user, res);
  return response;
    
  }
  catch (error) {
    response.code = 500;
    response.status = 'Failed';
    response.message = 'Error. Try again';
    return response;
  }
  
}

exports.updatePasswordService = async ({ id, body, res }) => {
  const response = {
    code: 201,
    status: 'Success',
    message: 'Password update  successfully',
  };

  const user = await User.findById({
    _id: id,
    isDelete: false,
  }).select('+password');

  if (!user) {
    response.code = 400;
    response.status = 'Failed';
    response.message = 'User is not Fount';
    return response;
  }

  const isMatched = await user.comparePassword(body.oldPassword)
  if (!isMatched) {
    response.code = 400;
    response.status = 'Failed';
    response.message = 'Old password is incorrect';
    return response;
  }
  user.password = body.password;
  await user.save();
  sendToken(user, res)
}

exports.updateProfileService = async ({ id, body }) => {
  const response = {
    code: 201,
    status: 'Success',
    message: 'Password update  successfully',
  };

  const user = await User.findById({_id: id});

  if (!user) {
    response.code = 400;
    response.status = 'Failed';
    response.message = 'User is not Fount';
    return response;
  }

  const isMatched = await user.comparePassword(body.oldPassword)
  if (!isMatched) {
    response.code = 400;
    response.status = 'Failed';
    response.message = 'Old password is incorrect';
    return response;
  }
  user.password = body.password;
  await user.save();
  sendToken(user, 200, res)
}