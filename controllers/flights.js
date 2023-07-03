
// Import our movie model in order to talk to the movies collection in mongodb
const FlightModel = require('../models/flight');
const TicketModel = require('../models/ticket');

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
  const existingDestinations = flight.destinations.map(d => d.airport);
  const availableDestinations = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'].filter((d) => !existingDestinations.includes(d));
  let sortedDestinations = flight.destinations.sort((a, b) => {
    let departsTimeA = a.toObject({ getters: false }).arrival;
    let departsTimeB = b.toObject({ getters: false }).arrival;
    return departsTimeA - departsTimeB;
  });
  const tickets = await TicketModel.find({ flight: flight._id });

  res.render('flights/show', {
    title: 'Flight Detail',
    flight,
    availableDestinations,
    sortedDestinations,
    tickets
  });
}

function newFlight(req, res) {
  const newFlight = new FlightModel();
  // Obtain the default date
  const dt = new Date(newFlight.departs);
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { title: 'Add Flight', departsDate, errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  try {
  const fightFromTheDatabase = await FlightModel.create(req.body);// the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a

  console.log(fightFromTheDatabase)
  res.redirect(`/flights'/${fightFromTheDatabase._id}`);  // Update this line
} catch (err) {
  // Typically some sort of validation error
  console.log(err);
  res.render('flights/new', { errorMsg: err.message });
}
}

// async function create(req, res) {
//   console.log('--------------------------------------1');
//   console.log(req.body)
//   try {
    
//       const flight = await FlightModel.findById(req.body.flight_id);
     
//       const newFlight = await FlightModel.create({
//           ...req.body,
//           flight,
//       });
    
//       res.redirect(`/flights/${req.body.flight_id}`)
//   } catch (err) {
//       res.send(err)
//   }
// }
