const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Create a JWT
const maxAge = 3 * 24 * 60 * 60;  // 3 days
const createToken = (id) => {
    return jwt.sign({id},process.env.SECRET,{
        expiresIn: maxAge,
    } );
};


// SignUp handler

const signUp = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const user = await User.create({firstName, lastName, email, password});
        const token = createToken(user._id);
        res.status(201).send({user: user.email, fName: user.firstName, lName: user.lastName , token: token});
    } catch (err) {
        const errors = err.message;
        res.status(400).json({ errors });
      }
}

// sign in handler
const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(201).send({user: user.email, fName: user.firstName, lName: user.lastName , token: token});
    } catch (err) {
        const errors = errorHandler(err);
        res.status(400).json({ errors });
      }

}





module.exports = {signUp, signIn};