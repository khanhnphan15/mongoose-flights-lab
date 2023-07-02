
// Import our movie model in order to talk to the movies collection in mongodb
const FlightModel = require('../models/flight');

module.exports = {
    create
}

async function create(req, res) {
    console.log(req.body)
    try {
        const flightFromTheDb = await FlightModel.findById(req.params.id)
        flightFromTheDb.destinations.push(req.body);
        await flightFromTheDb.save();
        // Then respond to the client!
        console.log(flightFromTheDb)

        res.redirect(`/flights/${req.params.id}`)

    } catch (err) {
        res.send(err)
    }
}
