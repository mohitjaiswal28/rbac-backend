
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

let DB = process.env.DATABASE_URL.replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);
DB = DB.replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

const connectToDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log('Connected to MongoDB Atlas successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectToDB;