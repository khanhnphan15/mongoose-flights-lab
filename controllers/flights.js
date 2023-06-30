const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create,
  update
};

function update(req, res) {
	req.body.done = !!req.body.done;
	SkillModel.update(req.params.id, req.body);
	res.redirect(`/flights/${req.params.id}`);
}


async function index(req, res) {
  const flights = await Flight.find({});
  console.log(flights);
  res.render('flights/index', { flights });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = new Date(newFlight.departs);
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { departsDate });
}

async function create(req, res) {
  // // convert nowShowing's checkbox of nothing or "on" to boolean
  // req.body.nowShowing = !!req.body.nowShowing;
  // // remove any whitespace at start and end of cast
  // // req.body.cast = req.body.cast.trim();
  // // split cast into an array if it's not an empty string - using a regular expression as a separator
  // if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // try {
  //   await Flight.create(req.body);
  //   // Always redirect after CUDing data
  //   // We'll refactor to redirect to the movies index after we implement it
  //   res.redirect('/flights');  // Update this line
  // } catch (err) {
  //   // Typically some sort of validation error
  //   console.log(err);
  //   res.render('flights/new', { errorMsg: err.message });
  // }
}

