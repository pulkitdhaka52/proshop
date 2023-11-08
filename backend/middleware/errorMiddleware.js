const notFound = (req,resp,next) =>{
    const error = new Error(`Not found -${req.originalUrl}`);
    resp.status(404);
    next(error);
}

//overwriting existing error handler

const errorHandler = (err,req,res,next) => {
    let statusCode = res.statusCode ===200? 500: res.statusCode;
    let message =  err.message;
    //check for mongoose and objectId
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message =  `Resource not found`;
        statusCode =  404;
    }

    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV === 'production' ? 'pancake' : err.stack,
        
    })
}

export {notFound,errorHandler};