const {Router} = require('express')
const {getEvents, createNew, getSingleEvent, edit, deleteEvent} = require('../Controllers/eventControllers')

const router = Router();

router.get('/myTasks/:id', getEvents);
router.post('/myTasks', createNew);
router.get('/event/:id', getSingleEvent);
router.delete('/delete/:id', deleteEvent);
router.put('/edit/:id', edit);

module.exports = router;