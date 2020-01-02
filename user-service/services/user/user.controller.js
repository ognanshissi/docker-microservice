const User = require('./user.model');


module.exports = {


    list: async (req, res, next) => {
        return res.status(200).json({message: '200 users found', data: []})
    },

    _create_user: async (data) => {
        try {
            const { email, password, confirmation_password } = data;
            error = {};

            if (email == null || email == '') {
                error.email = "Email is required"
            }

            if (password == null || password == '') {
                error.password = "Password is required"
            }

            if (password && (confirmation_password != password)) {
                error.confirmation_password = "Passwords dont much!"
            }

            if (error != null) {
                return res.status(400).json(error);
            }

            // check user 
            const user_ = await User.findOne({ email });

            if (user_) {
                throw Error("User exist with the email")
            }

            const _password = await User.hashPassword(password);

            const user = new User({
                email: email,
                password: _password
            });

            const user__ = await user.save();
            return user__;
        } catch (e) {
            throw e;
        }
    },

    create: async (req, res, next) => {
        // check if a user exist with the given email
        const { email, password, confirmation_password } = req.body;
        
        this._create_user(req.body);

        // 

        return res.status(201).json({message: 'created successfully', data: {id: 1}})
    },

    changePassword: async (req, res, next) => {
        return res.status(200).json({message: 'password updated !'})
    },


    update: async (req, res, next) => {
        return res.status(200).json({message: 'info updated !'})
    },


    addRole: async (req, res, next) => {

    }
}