const Product  = require('../models/product');
const APIFeatures = require('../utils/APIFeatures');

exports.Products = async({ page, size })=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'Products fetch successfully',
    };
    try {
        const pages = parseInt(page);
        const sizes = parseInt(size);
        const skip = pages * sizes;
        const products = await Product.find().skip(skip).limit(sizes).lean();
        const count = await Product.estimatedDocumentCount();
        if (!products) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No Product found at this moment';
            return response;
        }
        response.products = products
        response.count = count
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}

exports.Product = async({id})=>{
    const response = {
        code: 200,
        status: 'success',
        message: 'Product fetch successfully',
    };
    try {
        const product = await Product.findOne({ _id: id});
        if (!product) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No Product found by this id';
            return response;
        }
        response.product = product
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
}
exports.SearchProduct= async ({ q }) => {
    const response = {
      code: 200,
      status: 'success',
      message: 'Search data found successfully'
    };
  
    try {
        const apiFeatures = new APIFeatures(Product.find(), q).search().filter()
  
        const data = await apiFeatures.query
        if (data.length === 0) {
            response.code = 404;
            response.status = 'failed';
            response.message = 'No Search data found';
            return response
        }
        response.products = data;
        return response;
    } catch (error) {
        response.code = 500;
        response.status = 'failed';
        response.message = 'Error. Try again';
        return response;
    }
};