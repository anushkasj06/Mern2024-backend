const mongoose = require("mongoose");


const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected successfully to DB");
    } catch (error) {
        console.error("Database connection failed", error.message); // Log the exact error
        process.exit(1); 
    }
};
 

module.exports = connectDb;