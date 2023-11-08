import asyncHandler from "../middleware/asyncHandler.js";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";



/**
 * Function authUser()
 * @desc Auth user & get token
 * @route POST /api/user/login
 * @access Public
 */
const authUser = asyncHandler(async(req,resp)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email: email});
    console.log
    if(user && (await user.matchPassword(password))){
        generateToken(resp, user._id);
        resp.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        resp.status(401);
        throw new Error('Invalid email or password.');
    }
    return resp;
})

/**
 * Function registerUser()
 * @desc create new user and send token
 * @route POST /api/user/register
 * @access Public
 */
const registerUser = asyncHandler(async(req,resp)=>{
    const {name, email, password} = req.body;
    
    const userExist = userModel.findOne({email: email});
    
    if(!userExist){
        resp.status(400);
        throw new Error('User already exist.')
    }else{
        const user = await userModel.create({
            name,
            email,
            password
        });
        if(user){
            generateToken(resp, user._id);
            resp.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });

        }else{
            resp.status(400);
            throw new Error('Invalid user data');
        }
    }
})

/**
 * Function logoutUser()
 * @desc logout user and clear cookie
 * @route POST /api/user/logout
 * @access Private
 */
const logoutUser = asyncHandler(async(req,resp)=>{
    resp.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    resp.status(200).json({message:'Logged Out Successfully'})
})

/**
 * Function getUserProfile()
 * @desc get user profile
 * @route GET /api/user/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async(req,resp)=>{
    
    const user = await userModel.findById(req.user._id);
    if(user){
        resp.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        resp.status(404);
        throw new Error({message: 'Invalid request'});
    }
})

/**
 * Function updateUserProfile()
 * @desc update user profile
 * @route PUT /api/user/update
 * @access Private
 */
const updateUserProfile = asyncHandler(async(req,resp)=>{
    const user = await userModel.findById(req.user._id);
    if(user){
        user.name =  req.body.name || user.name;
        user.email =  req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        resp.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email:updateUser.email,
            isAdmin: updateUser.isAdmin

        })
    }else{
        resp.status(404);
        throw new Error('User not found');
    }
})


/**
 * Function getUsers()
 * @desc get user list for Admin
 * @route GET /api/admin/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async(req,resp)=>{
    resp.send('get user lists');
})

/**
 * Function getUserById()
 * @desc get user details by id
 * @route GET /api/admin/user/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async(req,resp)=>{
    resp.send('get user by id for admin');
})

/**
 * Function deleteUser()
 * @desc update user profile
 * @route DELETE /api/admin/user/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async(req,resp)=>{
    resp.send('user deleted from admin by id');
})

/**
 * Function updateUser()
 * @desc update user profile for admin
 * @route PUT /api/user/:id
 * @access Private/Admin
 */
const updateUser = asyncHandler(async(req,resp)=>{
    resp.send('update user by id');
})

export  { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}
