const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// ONE MOVIE HAS MANY REVIEWS 
// A REVIEW BELONGS TO A FLIGHT
// is the relationship for the reviews and movies

// if your embedding, you always
// write the many (side) schema (reviews) 
// in the One side (in this case movie)
const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United', 'Delta'],
    default: 'n / a'
  },
  flightNo: {
    type: Number,
    default: function () {
      return
    }
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX' & 'SAN'],
    default: 'DEN',
  },
  departs: {
    type: Number,
    default: function () {
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    },
    get: function (value) {
      // // Transform and return value here
      // return transformedValue;
      let date = new Date(value);
      let formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
      let timeEls = date.toTimeString().split(' ')[0].split(':');
      let formattedTime = `${timeEls[0]}:${timeEls[1]}`;
      return `${formattedDate}T${formattedTime}`;
    }
  },
  name: [String],
  reviews: [reviewSchema],
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);





