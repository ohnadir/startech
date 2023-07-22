const Order = require('../models/order');

exports.Order = async({ body })=>{
    const response = {
        code: 200,
        status: "success",
        message:"Order Successfully"
    };
    try {
        const result = await Order.create(body);
        response.order= result;
        return response; 
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.orderList = async()=>{
    const response = {
        code: 200,
        status: "success",
        message:"Order Fetch Successfully"
    };
    try {
        const result = await Order.find({}).sort({ _id:-1});
        response.orders= result;
        return response; 
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.OrderDetails = async({ id })=>{
    const response = {
        code: 200,
        status: "success",
        message:"Order Details fetch Successfully"
    };
    try {
        const order = await Order.findById({ _id : id })
        if(!order){
            response.code = 404;
            response.status = 'failed';
            response.message = 'No Order found by this id';
            return response;
        }
        response.order= order;
        return response; 
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.EmailOrder=async({email})=>{
    const response = {
        code: 200,
        status: true,
        message:"Email based Order Successfully"
    };
    try {
        const result = await Order.find({userEmail: email});
        if(!result){
            response.code = 404;
            response.status = 'failed';
            response.message = 'No Order found by this id';
            return response;
        }
        response.orders = result
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}