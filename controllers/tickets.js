// Import our flight model in order to talk to the flight collection in mongodb
const TicketModel = require('../models/ticket');
const FlightModel = require('../models/flight');

module.exports = {
    create,
    addToCast,
    newTicket,
    delete: deleteTicket,
};

async function deleteTicket(req, res) {
    await TicketModel.deleteOne( req.params.id);
    res.redirect(`/flights/${req.params.id}`);
    
};

async function create(req, res) {
    console.log('--------------------------------------1');
    console.log(req.body)
    try {
        console.log('--------------------------------------2');
        const flight = await FlightModel.findById(req.body.flight_id);
        console.log('-------------------------------------3');
        const newTicket = await TicketModel.create({
            ...req.body,
            flight,
        });
        console.log('--------------------------------------4');
        console.log('sdljdfglkjgjskgkjsgkjgjklgsjklskjlskjgsjkgsj');
        console.log(newTicket);
        console.log('uioiuytyuiuytyuiytrtyuytrtyuytrtyuytre')
        res.redirect(`/flights/${req.body.flight_id}`)
    } catch (err) {
        res.send(err)
    }
}

async function newTicket(req, res) {
    const flight = await FlightModel.findById(req.params.id);
    console.log(flight)
    res.render('tickets/new', { title: 'Add Ticket', errorMsg: '', flight });
};
async function addToCast(req, res) {
    const movie = await FlightModel.findById(req.params.id);
    flight.cast.push(req.body.performerId);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
};
