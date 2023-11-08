import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * Function getProduct()
 * @desc fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProduct = asyncHandler(async(req,resp)=>{
    const product = await Product.find({});
    resp.json(product);
})

/**
 * Function getProductById()
 * @desc fetch specific product
 * @route GET /api/products/id
 * @access Public
 */
const getProductById = asyncHandler(async(req,resp)=>{
    const product  = await Product.findById(req.params.id);
    if(product){
        return resp.json(product);
    }else{
        resp.status(404);
        throw new Error(`Resource not found`)
    }
})

export {getProduct, getProductById};