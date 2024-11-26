
const User = require('./../models/user.models');
const APIFeatures = require('./../utils/apiFeatures.utils');
const AppError = require('./../utils/appError.utils');
const catchAsync = require('./../utils/catchAsync.utils');

// Get all users
exports.getAllUser = catchAsync(async (req, res, next) => {
    // Build the query
    const apiFeatures = new APIFeatures(User.find(), req.query)
        .filter()
        .search() 
        .sort()
        .limitFields()
        .paginate();

    // Execute the query
    const users = await apiFeatures.query;

    // Send the response
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

// Reading a single user by userId 
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new AppError('No user found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// Creating user
exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

// Updating user
exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        return next(new AppError('No user found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// Deleting user
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
        return next(new AppError('No user found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});

