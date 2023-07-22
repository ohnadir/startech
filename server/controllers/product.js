const { Products, Product, SearchProduct } = require("../service/product");
exports.products = async (req, res ) => {
    const { status, code, message, products } = await Products();
    res.status(code).json({ code, status, message, products });
};
    
exports.product = async (req, res ) => {
    const { status, code, message, product } = await Product({ id:req.params.id});
    res.status(code).json({ code, status, message, product });
};
  
exports.searchProduct = async (req, res ) => {
    const { status, code, message, products } = await SearchProduct({ q: req.query});
    res.status(code).json({ code, status, message, products });
};