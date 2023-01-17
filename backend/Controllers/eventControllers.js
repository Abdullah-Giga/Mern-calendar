const Event = require('../Models/events');

const getEvents = (req, res) => {
    const id = req.params.id;
    Event.find({user_email : id}).then((result) => res.status(201).json(result)).catch((err) => console.log(err));
}

// get single event

const getSingleEvent =(req, res) => {
    try {
        const id = req.params.id;
        Event.findById(id).then((result) => res.status(201).json(result))    
    } catch (err) {
        const error = err.message;
        res.status(400).json({ error : error });
      }
}


// New event controller
const createNew =async (req, res) => {
    try {
        const event = new Event(req.body);
         await event.save()
    } catch (err) {
        const error = err.message;
        res.status(400).json({ error : error });
      }
    
}



// Event edit cotroller
const edit = (req, res) => {
    const id = req.params.id;
    console.log("update called")

         Event.findByIdAndUpdate(id,{
            $set:{
                start : req.body.start,
                end: req.body.end,
                name : req.body.name,
                location: req.body.location,
                allDay: req.body.allDay
            }
            },{new: true}
        ).then((result) => res.json({result})).catch((err) => console.log(err));
        }




// Event delete cotroller
const deleteEvent = (req, res) => {
    const id = req.params.id;
    Event.findByIdAndDelete(id).then((result) => res.json({result})).catch((err) => console.log(err));
}


module.exports = {getEvents, createNew, getSingleEvent ,edit ,deleteEvent};