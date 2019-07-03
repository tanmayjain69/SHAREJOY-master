const express = require('express');
const router = express.Router();

const eventController = require('../controllers/events');

// GET all events
router.get('/all/:userID',eventController.getAll);
router.get('/allbirthday/:userID', eventController.getAllbirthday);
router.get('/allaniversary/:userID', eventController.getAllaniversary);
router.get('/allmeetup/:userID', eventController.getAllmeetup);
router.get('/alloffice/:userID', eventController.getAlloffice);
router.get('/allwedding/:userID', eventController.getAllwedding);
// CREATE a new event
router.post('/birthday', eventController.createBirthday);
router.post('/meetup', eventController.createMeetup);
router.post('/office', eventController.createOffice);
router.post('/aniversary', eventController.createAniversary);
router.post('/wedding', eventController.createWedding);
// GET a specific event
router.get('/birthday/:ID', eventController.getBirthdayByID);
router.get('/office/:ID', eventController.getOfficeByID);
router.get('/meetup/:ID', eventController.getMeetupByID);
router.get('/aniversary/:ID', eventController.getAniversaryByID);
router.get('/wedding/:ID', eventController.getWeddingByID);
/*// GET list of invites sent for that event
router.post('/:eventID/invite', eventController.getEventInvites);
// Invite people to an event
router.post('/:eventID/invite', eventController.createInvite);
// Cancel invite
router.delete('/:eventID/:inviteID', eventController.cancelInvite);
*/
module.exports = router;
