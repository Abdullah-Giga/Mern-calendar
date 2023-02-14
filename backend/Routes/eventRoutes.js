const { Router } = require("express");
const {
  allEvents,
  createEvent,
  singleEvent,
  editEvent,
  deleteEvent,
} = require("../Controllers/eventControllers");

const router = Router();

router.route("/").
get(allEvents).
post(createEvent);
router.route("/event/:id")
.get(singleEvent)
.delete(deleteEvent)
.put(editEvent);

module.exports = router;
