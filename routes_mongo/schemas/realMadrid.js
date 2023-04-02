var mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'movies23';
var mongoString = `mongodb://${server}/${database}`;

var connection13 = mongoose.createConnection(mongoString);

let rmSchema = new mongoose.Schema({ 
    playerName: { type: String, required: true, unique: true },
    postion: { type: String, required: true, enum: ['GK', 'Defence', 'Midfield', 'Attack' ] },
    otherStuff: {type: mongoose.Schema.Types.Mixed },
    description: {type: String },
    isActive: { type: Boolean },
    otherClubs: [String],
    dateJoined: { type: Date },
    phone: {
        type: String,
        validate: {
          validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
});

// { _id : false }  
// this wont work with mongoose
// Mongoose explicitly doesn't support saving documents without a top-level _id

rmSchema.index({ 
    description: 'text', otherStuff: 'text' 
});

module.exports = connection13.model('realMadrid12', rmSchema);