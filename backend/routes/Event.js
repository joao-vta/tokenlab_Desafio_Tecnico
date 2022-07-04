const express = require('express');
const router = express.Router();
const EventController = require('../controllers/Event')

router.post('/event/create', EventController.createEvent);
router.get('/event/user/:id', EventController.getUserEvents);
router.post('/event/user/range/:id', EventController.getUserEventsInRange);
router.put('/event/edit/:id', EventController.editEvent);
router.delete('/event/delete/:id', EventController.deleteEvent);


module.exports = router;