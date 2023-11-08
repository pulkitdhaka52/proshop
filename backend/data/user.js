import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Pulkit Dhaka',
        email:'pulkitdhaka52@gmail.com',
        password:bcrypt.hashSync('12345',10),
        isAdmin: false
    },
    {
        name: 'Sanjay Sutradhar',
        email:'sanjay4567@gmail.com',
        password:bcrypt.hashSync('12345',10),
        isAdmin: false
    },
    {
        name: 'admin',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('12345',10),
        isAdmin: true
    },
]

export default users;