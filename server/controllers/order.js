const { Order, EmailOrder, OrderDetails, orderList } = require("./service")

exports.orders = async (req, res) => {
    const { code, status, message, orders } = await orderList();
    res.status(code).json({ code, status, message, orders });
};

exports.order = async (req, res) => {
    const { code, status, message, order } = await Order({ body:req.body});
    res.status(code).json({ code, status, message, order });
};

exports.orderDetails = async (req, res) => {
    const { code, status, message, order } = await OrderDetails({ id:req.params.id });
    res.status(code).json({ code, status, message, order });
};

exports.emailOrder = async (req, res) => {
    const { status, code, message, orders } = await EmailOrder({email : req.params.email});
    res.status(code).json({ code, status, message, orders });
};