const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    productInfo:{
        name:{
            type : String,
            required: true
        },
        price:{
            type : Number,
            required: true
        },
        quantity:{
            type : Number,
            required: true
        }
        ,
        image:{
            type : String,
            required: true
        }
        
    },
    shippingInfo: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String
        }
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    userName:{
        type : String
    },
    userEmail:{
        type : String
    },
    paidAt: {
        type: Date,
        default: Date.now()
    },
    orderNumber:{
        type: Number,
        default: Math.floor(Math.random() * 1000000)
    },
    deliveryStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Order', orderSchema);