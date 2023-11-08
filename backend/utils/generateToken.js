import jwt from 'jsonwebtoken';
const  generateToken = (resp, userId) =>{
    const token  = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    
    //set JWT as HTTP-only cookie
    resp.cookie('jwt',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000 //30 days
    })
}

export default generateToken;
