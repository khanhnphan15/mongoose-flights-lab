const FlightModel = require('../models/flight');

module.exports = {
  index,
  show,
  new: newFlight,
  create,
};

async function index(req, res) {
  const flights = await FlightModel.find({});
  let sortedFlights = flights.sort((a, b) => {
    let departsTimeA = a.toObject({ getters: false }).departs;
    let departsTimeB = b.toObject({ getters: false }).departs;
    return departsTimeB - departsTimeA;
  });
  res.render('flights/index', { title: 'All Flights', flights: sortedFlights });
};

async function show(req, res) {
  const flight = await FlightModel.findById(req.params.id);
  res.render('flights/show', { title: 'Flight Detail', flight });
}


// function update(req, res) {
//   req.body.done = !!req.body.done;
//   FlightModel.update(req.params.id, req.body);
//   res.redirect(`/flights/${req.params.id}`);
// };

function newFlight(req, res) {
  const newFlight = new FlightModel();
  // Obtain the default date
  const dt = new Date(newFlight.departs);
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { title: 'Add Flight', departsDate});
}


async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  // req.body.nowShowing = !!req.body.nowShowing;
  // // remove any whitespace at start and end of cast
  // req.body.cast = req.body.cast.trim();
  // // split cast into an array if it's not an empty string - using a regular expression as a separator
  // if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // // Remove empty properties so that defaults will be applied
  // for (let key in req.body) {
  //   if (req.body[key] === '') delete req.body[key];
  // }
  // try {


  //   const movieFromTheDatabase = await MovieModel.create(req.body);// the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a
  //   //and put the contents form in the db, and come to the express server

  //   // if you want to see what you put in the database on your server
  //   console.log(movieFromTheDatabase)

  //   // Always redirect after CUDing data
  //   // We'll refactor to redirect to the movies index after we implement it
  //   res.redirect('/movies');  // Update this line
  // } catch (err) {
  //   // Typically some sort of validation error
  //   console.log(err);
  //   res.render('movies/new', { errorMsg: err.message });
  // }
}

