var mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'movies23';
var mongoString = `mongodb://${server}/${database}`;
let validator = require('validator');
/************************************************************************ */
// APPROACH I ========> mongoose.connect()      permitted only once in application
// mongoose.connect(mongoString, { useNewUrlParser: true , useUnifiedTopology: true});


// APPROACH II =======> mongoose.createConnection()         used for accessing multiple databases
var connection11 = mongoose.createConnection(mongoString);
/************************************************************************ */
function obfuscate23(email) {
    const id23 = email.indexOf('@');
    return 'blahblah';
    // return email[0] + email[1] + email.slice(2, id23).replace(/./g, '*');    
}

/************************************************************************ */
// Define the Schema
// It will fail if the data type of the value is not a string type.
let emailSchema = new mongoose.Schema({
    
    // APPROACH I =============> basic string... no validators, nothing
    // email: String

    // APPROACH II ===> unique; required field; convert the value to lowercase; valid Email address
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        get: obfuscate23,
        validate: (value) => {
          return validator.isEmail(value)
        }
    }
});

// call the model() constructor on the Mongoose instance
    // pass it the name of the collection and a reference to the schema definition.
module.exports = connection11.model('Email', emailSchema);
// 1st arg ===> singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
// So, model 'Email' is for the 'emails' collection in the database.