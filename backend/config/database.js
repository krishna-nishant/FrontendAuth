const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const connectToDB = async () => {
    try {
        mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.nk87out.mongodb.net/frontendAuth`)
        console.log('Database connected');
    } catch (error) {
        console.log("error in database connection", error);
    }
}

module.exports = connectToDB;