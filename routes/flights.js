const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const flightsCtrl = require('../controllers/flights');

// POST /flights
router.post('/create', flightsCtrl.create);
// GET /flights
router.get('/', flightsCtrl.index);
// GET /flights/new
router.get('/new', flightsCtrl.new);
// GET /flights/:id (show functionality) MUST be below new route
router.get('/:id', flightsCtrl.show);


module.exports = router;
