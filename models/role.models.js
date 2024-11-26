
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide role name'],
    },
    role: {
        type: String,
        required: [true, 'Please provide role'],
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type: [String],
        default: []
    },
    remarks: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;