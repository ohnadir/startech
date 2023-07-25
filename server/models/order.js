const { mongoose } = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [],
    shippingInfo: {},
    paymentStatus: {},
    deliveryMethod:{ type : String },
    paymentMethod:{ type : String },
    shippingCost:{ type : Number },
    discount:{ type : Number },
    total:{ type : Number },
    userName:{ type : String },
    userEmail:{ type : String },
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