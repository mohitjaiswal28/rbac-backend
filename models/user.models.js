
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,    // convert email to lowercase
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        unique: true,
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    date_of_birth: {
        type: Date,
        required: [true, 'Please provide your date of birth']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,   // Reference to the Role model
        ref: 'Role',                           // Referencing the Role model
        required: [true, 'Please assign a role to the user'],
    },
    role_name: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

// Pre-save hook to set the role_name before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('role')) {
        const role = await mongoose.model('Role').findById(this.role);
        this.role_name = role ? role.name : null; 
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;