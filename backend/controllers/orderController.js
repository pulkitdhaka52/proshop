import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * Function createOrder()
 * @desc Create new Order
 * @route POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async(req,resp)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length ===0){
        resp.status(400);
        throw new Error('No order items')
    }else{
        const order =  new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder =  await order.save();
        resp.status(201).json(createOrder);
    }
    
})

/**
 * Function getMyOrders()
 * @desc get logged In user order
 * @route GET /api/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async(req,resp)=>{
    const orders =  await Order.find({ user: req.user.id})
    resp.status(200).json(orders);
})

/**
 * Function getOrderById()
 * @desc get order by Id
 * @route GET /api/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async(req,resp)=>{
    const order =  await Order.findById(req.params.id).populate('user','name email');
    if(order){
        resp.status(200).json(order);
    }else{
        resp.status(404);
        throw new Error('Order not found');
    }
    
})

/**
 * Function updateOrderToPaid()
 * @desc update order to paid
 * @route PUT /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async(req,resp)=>{
    
    const order =  await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_at,
            email_address: req.body.email_address
        }
        const updateOrder =  await order.save();
        resp.status(200).json(updateOrder);
    }else{
        resp.status(404);
        throw new Error('Order not found');
    }
})

/**
 * Function updateOrderToDelivered()
 * @desc update order to deliver
 * @route PUT /api/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async(req,resp)=>{
    const order =  await Order.findById(req.params.id);
    if(order){
        order.isDelivered =  true;
        order.deliveredAt = Date.now();
        const updateOrder =  await order.save();
        resp.status(200).json(updateOrder);
    }else{
        resp.status(404);
        throw new Error('Order not found');
    }
})

/**
 * Function updateOrderToDelivered()
 * @desc get all orders
 * @route GET /api/orders/
 * @access Private/Admin
 */
const getOrders = asyncHandler(async(req,resp)=>{
    const orders = await Order.find({}).populate('user','id name');
    resp.status(200).json(orders);
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders
}