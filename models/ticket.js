const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat: {
        type: String,
        default: 'n/a'
    },
    price: {
        type: Number, 
        minimum: 0,
        default: 'n/a'
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flights',
        default: 'n/a',
      },

}, {
    timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Tickets', ticketSchema);