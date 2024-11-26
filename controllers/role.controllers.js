
const Role = require('./../models/role.models');
const APIFeatures = require('./../utils/apiFeatures.utils');
const AppError = require('./../utils/appError.utils');
const catchAsync = require('./../utils/catchAsync.utils');

// Get all roles
exports.getAllRole = catchAsync(async (req, res, next) => {
    // Build the query
    const apiFeatures = new APIFeatures(Role.find(), req.query)
        .search() 
        .filter()
        .sort()
        .limitFields()
        .paginate();

    // Execute the query
    const roles = await apiFeatures.query;

    // Send the response
    res.status(200).json({
        status: 'success',
        results: roles.length,
        data: {
            roles,
        },
    });
});


// Get all active roles 
exports.getActiveRoles = catchAsync(async (req, res, next) => {
    const activeRoles = await Role.find({ is_active: true }).sort('name');

    if (!activeRoles.length) {
        return next(new AppError('No active roles found', 404));
    }

    res.status(200).json({
        status: 'success',
        results: activeRoles.length,
        data: {
            roles: activeRoles
        }
    });
});

// Reading a single role by roleId 
exports.getRole = catchAsync(async (req, res, next) => {
    const role = await Role.findById(req.params.roleId);

    if (!role) {
        return next(new AppError('No role found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            role
        }
    });
});

// Creating role
exports.createRole = catchAsync(async (req, res, next) => {
    const newRole = await Role.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            role: newRole
        }
    });
});

// Updating role
exports.updateRole = catchAsync(async (req, res, next) => {
    const role = await Role.findByIdAndUpdate(req.params.roleId, req.body, {
        new: true,
        runValidators: true
    });

    if (!role) {
        return next(new AppError('No role found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            role
        }
    });
});

// Deleting role
exports.deleteRole = catchAsync(async (req, res, next) => {
    const role = await Role.findByIdAndDelete(req.params.roleId);

    if (!role) {
        return next(new AppError('No role found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});
