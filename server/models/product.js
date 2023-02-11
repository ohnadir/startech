const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");


const productSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true},
    price: { type: String, required: true},
    productPictures: [],
    reviews: [],
    brand: {
      type: String, 
      required: true, 
      trim: true 
    },
    category: { 
      type: String, 
      required: true, 
      trim: true 
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = model('product', productSchema);
