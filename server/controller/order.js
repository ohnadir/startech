const Order = require('../models/order');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    
    const { productInfo, shippingInfo, paymentInfo } = req.body;
    const result = await Order.create({
        productInfo, shippingInfo, paymentInfo
    });
    await result.save();
    res.status(201).json({
        success: true,
        statusCode : 200,
        message: "Order successful",
        result
    })
});
exports.getOrderList = catchAsyncErrors(async (req, res, next) => {
    
    const orderList = await Order.find({});
    if(!orderList){
        return next(new ErrorHandler('Order list not Found', 404))
    }

    res.status(201).json({
        success: true,
        statusCode : 200,
        message: "Order get successfully",
        orderList
    })
});