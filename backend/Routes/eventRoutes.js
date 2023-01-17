const {Router} = require('express')
const {getEvents, createNew, getSingleEvent, edit, deleteEvent} = require('../Controllers/eventControllers')

const router = Router();

router.get('/Dashboard/:id', getEvents);
router.post('/Dashboard', createNew);
router.get('/event/:id', getSingleEvent);
router.delete('/delete/:id', deleteEvent);
router.put('/edit/:id', edit);

module.exports = router;