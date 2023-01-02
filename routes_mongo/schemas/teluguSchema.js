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
    { 
        strict: false,          // if strict:true ===> values passed to our model constructor 
                                    // that were not specified in our schema do not get saved to the db.

        toJSON: { virtuals: true}       // Mongoose does not include virtuals when you convert a document to JSON
                                            // so use virtuals:true to send this...
                                        // to show virtuals in console logs
                                            // console.log(doc.toObject({ virtuals: true }));
    } 
);

// Helpers: 
    // Instance methods (or) 
    // static methods (or) 
    // virtuals 
// none of them are stored in the database.
// virtuals are accessed like properties & methods are called like functions.
    // You can also "set" virtual properties 


// helper1: virtualProperty... 
teluguSchema.virtual('leadCombo1').get(function() { return this.hero + '__' + this.heroine; });
teluguSchema.virtual('heroDir').get(function() {
    return this.hero + '__' + this.director;
}).set(function(updateInfo23) {
    this.hero = updateInfo23.split('__')[0];
    this.director = updateInfo23.split('__')[1];
});

// helper2: Instance Methods
teluguSchema.methods.getInitials = function() {
    return this.firstName[0] + this.lastName[0]
}

module.exports = connection12.model('telugu23', teluguSchema);