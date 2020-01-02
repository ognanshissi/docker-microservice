const User = require('../user/user.model');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

module.exports = {
    home: async (req, res, next) => {
        res.status(200).json({
            msg: 'Welcome to auth controller'
        })
    },
    // login
    login: async (req, res, next) => {

        try {
             // grab credentials
            const { email, password } = req.body;

            // check if credential are given
            if (email === null || email === '' || password === null || password === '') {
                return res.status(400).json({message: 'Email and password is required'})
            }

            // check email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({message: 'Email/Password incorrects!'})
            }

            // verify password
            if (!User.verifyPassword(user.password, password)) {
                return res.status(404).json({message: 'Email/Password incorrects!'})
            }
            
            // generate payload
            const payload = {
                user_id: user.id,
                email: user.email
            }

            // generate jwt token
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })

            const userData = {
                token: token,
                user_id: user.id,
                email: user.email,
                token_type: process.env.JWT_TOKEN_TYPE,
                username: user.email.split('@')[0],
                token_expiration: 3600 // seconds
            }

            return res.status(200).json(userData);

        } catch (e) {
            throw e;
        }
       
    },

    // logout
    logout: async (req, res, next) => {


    },

    /**
     * Password forgot
     * 
     * Receive email and validate it, send a reset email to the account
     */
    forgot: async (req, res, next) => {

        // email => req.body
        const { email } = req.body;
        if (email == null || email == '') {
            return res.status(400).json({
                message: 'Email can\'t be empty!'
            })
        }

        // query corresponding user in the database


        // 

    },


    /**
     * Open the link from the mailbox
     * 
     * Enter (new_password, password_confirmation)
     * 
     */
    resetPassword: async (req, res, next) => {

        // token => req.query
        // verify token
        // compare passwords
        // update user password
        // ----------------- // 

    }
}