//Import required Mongoose package
const mongoose = require('mongoose');
//Connects the app to the database using the Mongoose ODM library
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskManager');

module.exports = mongoose.connection;