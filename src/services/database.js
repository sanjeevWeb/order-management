const mongoose = require('mongoose')

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    
        console.log('DB connected successfully');
    } 
    catch (error) {
        console.log('DB error: ', error);
    }
}

module.exports = connectMongoDB