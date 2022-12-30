var mongoose = require('mongoose');
let validator = require('validator');

// Define the Schema
// It will fail if the data type of the value is not a string type.
let emailSchema = new mongoose.Schema({
    
    // basic string
    // email: String

    // email property ===> unique; required field; convert the value to lowercase; valid Email address
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        }
    }
});

// call the model() constructor on the Mongoose instance
    // pass it the name of the collection and a reference to the schema definition.
module.exports = mongoose.model('Email', emailSchema);