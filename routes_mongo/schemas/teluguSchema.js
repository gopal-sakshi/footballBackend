var mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'movies23';
var mongoString = `mongodb://${server}/${database}`;

/************************************************************************ */
// APPROACH I ========> mongoose.connect()      permitted only once in application
// mongoose.connect(mongoString, { useNewUrlParser: true , useUnifiedTopology: true});


// APPROACH II =======> mongoose.createConnection()         used for accessing multiple databases
var connection12 = mongoose.createConnection(mongoString);


// APPROACH III =======> mongoose.connection.useDb()
/************************************************************************ */

let teluguSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        hero: { type: String, required: true },
        heroine: { type: String, required: true },
        director: { type: String, required: true }
    },
    // { strict: false }       // if strict:true ===> values passed to our model constructor 
                                // that were not specified in our schema do not get saved to the db.
);

teluguSchema.virtual('leadCombo').get(function() { return this.hero + '__' + this.heroine })

module.exports = connection12.model('telugu23', teluguSchema);