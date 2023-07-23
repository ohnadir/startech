const User = require('../models/user');
const sendToken = require("../utils/jwtToken")

exports.registration = async ({ body, email, phone, res }) => {
    const response = {
      code: 200,
      status: 'success',
      message: 'Registration successfully'
    };

    try {
        const isEmailExist = await User.findOne({ email : email });
        if (isEmailExist) {
            response.code = 400;
            response.status = 'failed';
            response.message = 'Email already taken';
            return response;
        }

        const isPhoneExist = await User.findOne({ phone : phone });
        if (isPhoneExist) {
            response.code = 400;
            response.status = 'failed';
            response.message = 'Phone Number already taken';
            return response;
        }

        const user = await User.create(body);
        sendToken(user, res)

        response.user = user;
        return response;
         
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
};

exports.login = async ({ email, password, res }) => {
    const response = {
      code: 200,
      status: 'success',
      message: 'login successfully',
    };
  
    try {
        const user = await User.findOne({email : email});
        if (!user) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'Incorrect credential';
            return response;
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'Incorrect credential';
            return response;
        }

        sendToken(user, res)
        response.user = user;
        return response
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
};

exports.updateProfile = async ({ name, email, phone, address, id }) => {
    const response = {
      code: 200,
      status: 'success',
      message: 'Profile Update successfully',
    };
  
    try {
        const user = await User.findOne({_id : id});
        if (!user) {
            response.code = 422;
            response.status = 'failed';
            response.message = 'Incorrect credential';
            return response;
        }
        /* const isPhoneExist = await User.findOne({ phone });
        console.log(isPhoneExist)
        if ( isPhoneExist) {
            response.code = 422;
            response.status = 'failed';
            response.message = 'Phone number already taken';
            return response;
        } */

        const isEmailExist = await User.findOne({ email: email });
        if ( isEmailExist) {
            response.code = 422;
            response.status = 'failed';
            response.message = 'Email already taken';
            return response;
        }
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.phone = phone ? phone : user.phone;
        user.address = address ? address : user.address;
        
        await user.save();        
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
};


exports.loadUser=async({ req })=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'Load user successfully',
    };
    try {
        const user = await User.findById(req.user.id);
        response.user = user;
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.allUser = async()=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'Users fetch successfully',
    };
    try {
        const users = await User.find({}).sort({ _id:-1});
        if (!users) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No User found at this moment';
            return response;
        }
        response.users = users
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.singleUser = async({id})=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'User fetch successfully',
    };
    try {
        const user = await User.findOne({ _id: id});
        if (!user) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No User found by this id';
            return response;
        }
        response.user = user
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.password = async({ id, newPassword, password })=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'Change Password successfully',
    };
    try {
        console.log(newPassword, password)
        const user = await User.findOne({ _id: id});
        if (!user) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No User found by this id';
            return response;
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'Password do not match';
            return response;
        }
        user.password = newPassword;
        await user.save();  
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.PutUserInfo = async({ id, phone, address })=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'Update User successfully',
    };
    try {
        const user = await User.findOne({ _id: id});
        if (!user) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No User found by this id';
            return response;
        }
        
        user.phone = phone ? phone : user.phone ;
        user.address = address ? address : user.address;
        await user.save();  
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.Logout = async ({ res }) => {
    const response = {
      code: 200,
      status: 'success',
      message: 'logout successfully',
    };
  
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        return response
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
};