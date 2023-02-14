const Event = require("../Models/events");

const allEvents = (req, res) => {
  const id = req.user._id;
  Event.find({ user: id })
    .then((result) => res.status(201).json(result))
    .catch((err) => console.log(err));
};

// get single event

const singleEvent = (req, res) => {
  try {
    const id = req.params.id;
    Event.findById(id).then((result) => res.status(201).json(result));
  } catch (err) {
    const error = err.message;
    res.status(400).json({ error: error });
  }
};

// New event controller
const createEvent = async (req, res) => {
  try {
    const event = new Event({
      start: req.body.start,
      end: req.body.end,
      name: req.body.name,
      location: req.body.location,
      allDay: req.body.allDay,
      user: req.user._id,
    });
    event.save().then(() => {
      res.status(201).json(event);
    });
  } catch (err) {
    const error = err.message;
    res.status(400).json({ error: error });
  }
};

// Event edit cotroller
const editEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndUpdate(
    id,
    {
      $set: {
        start: req.body.start,
        end: req.body.end,
        name: req.body.name,
        location: req.body.location,
        allDay: req.body.allDay,
        user:req.user._id
      },
    },
    { new: true }
  )
    .then((result) => res.json({ result }))
    .catch((err) => console.log(err));
};

// Event delete cotroller
const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((result) => res.json({ result }))
    .catch((err) => console.log(err));
};

module.exports = {
  allEvents,
  createEvent,
  singleEvent,
  editEvent,
  deleteEvent,
};
