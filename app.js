
const express = require('express');
const userRouter = require('./routes/user.routes');
const roleRouter = require('./routes/role.routes');
const AppError = require('./utils/appError.utils');
const errorHandler = require('./middlewares/error.middleware');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const app = express();

// Use CORS middleware to enable CORS
app.use(cors({
    origin: process.env.CLIENT_PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);

// 404 route handling middleware
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error handling middleware
// This middleware gets called when next is called with an argument error
app.use(errorHandler);

module.exports = app;