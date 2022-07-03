const express = require('express');
const router = express.Router();
const EventController = require('../controllers/Event')

router.post('/event/create', EventController.createEvent);
router.get('/event/user/:id', EventController.getUserEvents);
router.post('/event/user/range/:id', EventController.getUserEventsInRange);


module.exports = router;