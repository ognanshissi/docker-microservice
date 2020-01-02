const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: [true, "L'email doit être unique"]
    },
    password: {
        type: String,
        required: true,
    },

    first_name: {
        type: String,
        required: false
    },

    last_name: {
        type: String,
        required: false
    },

    username: {
        type: String,
        required: false
    },

    // jwt token with expiration time 
    // contain the user email
    token: {
        type: String,
        require: false
    },
    
    // auto filled
    // last_name + first_name
    full_name: {
        type: String,
        required: false
    },
    
    isActive: Boolean,
    isStaff: Boolean,
    isAdmin: Boolean
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);


// verify given password
module.exports.verifyPassword = (encryptedPassword, plainPassword) => {
    let response = false;

    if (bcrypt.compare(plainPassword, encryptedPassword)) response = true;

    return response;
}

// hash the password
module.exports.hashPassword =  async (plainPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);
    } catch (e) {
        throw e;
    }
}

// get username
module.exports.getUsername = () => {
    
}

// send email