
const app = require('./app');
const connectToDB = require('./connection');

const PORT = process.env.PORT || 3000;

// Handle uncaught exceptions to handle synchronous errors like undeclared variables
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Connect to MongoDB Atlas
connectToDB();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} with ${process.env.NODE_ENV} environment`);
});

// Handle unhandled rejections to handle asynchronous errors like invalid database credentials
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
