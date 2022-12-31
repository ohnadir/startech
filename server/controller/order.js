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