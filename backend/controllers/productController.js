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

/**
 * Function createProduct()
 * @desc create new product
 * @route POST /api/products
 * @access Private/Admin
 */
const createProduct = asyncHandler(async(req,resp)=>{
    const product = new Product({
        name: 'Sample name',
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        price: 0,
        countInStock: 0,
        numReviews: 0,
    });
    const createdProduct = await product.save();
    resp.status(201).json(createdProduct);

})

/**
 * Function updateProduct()
 * @desc update the existing product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProduct = asyncHandler(async(req,resp)=>{
    const {name, price, description, image, brand, category, countInStock} =  req.body;

    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image =  image;
        product.brand =  brand;
        product.category = category;
        product.countInStock =  countInStock;

        const updateProduct = product.save();
         resp.status(201).json(updateProduct);
    }else{
        resp.status(404);
        throw new Error('Resource not found');
    }

})

/**
 * Function deleteProduct()
 * @desc delete the existing product
 * @route delete /api/products/:id
 * @access Private/Admin
 */
const deleteProduct = asyncHandler(async(req,resp)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        await product.deleteOne({_id:product._id});
        resp.status(200).json({message: 'Product deleted'});
    }else{
        resp.status(404);
        throw new Error('Resource not found');
    }

})

export {getProduct, getProductById, createProduct, updateProduct, deleteProduct};