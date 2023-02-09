const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const key = "sk_test_51MJynOHzN4rqAg27ANNd3jxVWSvfuJmhIiHc2ERjvtYVf4Xuv7DdMVKtMvxqBMggqc24woS3nSOwqDscfiALWzos00hMPrZ2qj"
// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        message:"done",
        client_secret: paymentIntent.client_secret
    })

})
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: key
    })

})