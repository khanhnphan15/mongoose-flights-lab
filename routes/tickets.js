const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const ticketsCtrl = require('../controllers/tickets');
//This router is mounted to a "starts with" path of '/'
	
// GET /tickets/new(new functionality)
router.post('/tickets/create', ticketsCtrl.create);
//POST/flights/:id/tickets
router.get('/flights/:id/tickets/new', ticketsCtrl.newTicket);
//DELETE/tickets/:id
router.post('/flights/:id/tickets/delete', ticketsCtrl.delete);
router.delete('/flights/:id/tickets/delete', ticketsCtrl.delete);
//PUT/tickets/:id
// router.put('/:id', ticketsCtrl.update);

module.exports = router;