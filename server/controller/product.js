const Product = require('../models/product');
const ErrorHandler = require('../middleware/errors');
const  catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const APIFeatures = require('../utils/APIFeatures');

exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, price, quantity, desc, productPictures, category }= req.body;

  const isNameExist = await Product.findOne({ name });
  if (isNameExist) {
    return next(new ErrorHandler('Name already taken', 422))
  }

  const newProduct = new Product({
    name,
    price,
    quantity,
    desc,
    productPictures,
    category
  });
  await newProduct.save();
  res.status(200).json({
    status: true,
    statusCode: 200,
    message:"Add Product Successfully"
  })
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const { name, price, desc } = req.body;

    const product = await Product.findOne({ _id: id }).exec();
    if (!product) {
      return next(new ErrorHandler('No Product Found', 422))
    }

    const isNameExist = await Product.findOne({ name });
    if (
      isNameExist &&
      name === isNameExist.name &&
      String(product._id) !== String(isNameExist._id)
    ) {
      return next(new ErrorHandler('Already taken this name', 422))
    }

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.desc = desc ? desc : product.desc;

    await product.save();
    res.status(200).json({
      status: true,
      statusCode: 200,
      message:"updated Product Successfully"
    })
    
 
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next)=> {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    return next(new ErrorHandler('No Product found by this id', 404))
  }

  product.isDelete = true;
  product.deletedAt = Date.now();
  await product.save();
  res.status(200).json({
    status: true,
    statusCode: 200,
    message:"Delete Product Successfully"
  })
  
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const { page, size} = req.query;
  const pageNumber = parseInt(page) || 1;
  const limit = parseInt(size) || 10;

  const totalDocuments = await Product.countDocuments({});
  const totalPage = Math.ceil(totalDocuments / limit);

  const products = await Product.find({ isDelete: false })
    .select('-__v -isDelete')
    .sort({ _id: -1 })
    .skip((pageNumber - 1) * limit)
    .limit(limit)
    .lean();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message:"Fetch Product Successfully",
    products,
    currentPage: pageNumber,
    totalDocuments,
    totalPage,
  })
});

exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({_id:id});

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    product
  })
});

// Create new review   =>   /api/v1/review
exports.createProductReview = async ({body, req}) => {
  const response = {
    code: 200,
    status: 'Success',
    message: 'Review create Successfully'
  };


  try {
    const { rating, comment, productId } = body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    }

    const product = await Product.findById(productId);
    if (!product) {
      response.code = 402;
      response.status = 'Failed';
      response.message = 'No Data found by this ID';
      return response;    
    }

    const isReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
      product.reviews.forEach(review => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      })

    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length
    }
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    return response;

  }
  catch (error) {
    response.code = 500;
    response.status = 'failed';
    response.message = 'Error. Try again';
    return response;
  }
}

exports.deleteReviewService = async ({ id }) => {
  
  const product = await Product.findById(id);

  if (!product) {
    response.code = 402;
    response.status = 'Failed';
    response.message = 'No Data found by this ID';
    return response; 
  }
  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

}