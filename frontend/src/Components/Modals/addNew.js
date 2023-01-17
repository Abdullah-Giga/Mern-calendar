import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './modal.css'
import { useNavigate } from 'react-router-dom';
import { Autocomplete , TextField} from '@mui/material';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
};

export default function AddNew() {


  const[cities, setCities] = React.useState([]);

  // Get current User
  const user_email = localStorage.getItem('email');
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // New event handler
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [allDay, setAllDay] = React.useState((a)=> (true));
  const[start, setStart] = React.useState((a)=> ('9'));
  const [end, setEnd] = React.useState((a)=> ('9.5'));
  const [error, setError] = React.useState('');
  
  const handleNew = () => {
   
    try {
      fetch(`http://localhost:5000/Dashboard`, {
        method: 'POST',
        body: JSON.stringify({start, end, name, location, allDay ,user_email}),
        headers: {"Content-Type": "application/json"}
      })
      .then((res) => {
      if(!res.ok){
        setError("Could not save data. Make sure all fields are full");
      }
        res.json()      
        .then((data) => {
            console.log(data);
          })
    })

    } catch (error) {
      console.log(error)  
    }
 }

 const disable = (e) => {
        var id  = '';
        document.querySelectorAll(".start").forEach(opt=>{
            if(opt.value === e.target.value){
                id = opt.id
                setStart(id)
            }
        })
        document.querySelectorAll(".end").forEach(opt => {
            if (parseFloat(opt.id) <= parseFloat(id)) { 
                opt.disabled = true;
            }
        });
 }
  // get cities api
  const getLocations = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $exists: true,
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${where}`,
      {
        headers: {
          "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J", // This is the fake app's application id
          "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS", // This is the fake app's readonly master key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need
     
    data?.results?.map(city => setCities((prev) => [...prev, city.name]))
    
  };
  
   React.useEffect(()=> {
    getLocations();
   },[])

console.log("Location ", location)

  return (
    <div>
      <Button className='blue-btn' title='Add a new event' onClick={handleOpen}><span className='blue-txt'>Add New</span></Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <form className="modal-form">
            <h1 className="all">Add a New Event</h1>
              <label>Event Name</label>
              
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} required />
            <Autocomplete
                required
                disablePortal
                id="combo-box-demo"
                options={cities && cities}
                sx={{ width: '100%', height:'50px' }}
                onChange={(e) => setLocation(e.target.textContent)}
                renderInput={(params) => <TextField {...params} label="Location"  />}
              />
            <label>Event Type:</label>
            <div className = "radio">
                <input className="radio-btn" type="radio" id="allDay" required name="event_type" value = {true} onChange= {(e) => setAllDay((a) => (e.target.value))}/>All Day
                <input className="radio-btn" type="radio" id="timely" required name="event_type" value = {false} onChange= {(e) => setAllDay((a) => (!allDay))} />Timely
              </div>
            {allDay == false ? 
              <div className="time-fields">
            <label>Start Time</label>
            <select 
            required
                        value={start}
                        onChange={(e) => {
                            setStart((a) => (e.target.value))
                            disable(e)
                        }}
            >
              
                <option className = "start" id='9' value="9">9 am</option>
                <option className = "start" id='9.5' value="9.5">9:30 am</option>
                <option className = "start" id='10' value="10">10 am</option>
                <option className = "start" id='10.5' value="10.5">10:30 am</option>
                <option className = "start" id='11' value="11">11 am</option>
                <option className = "start" id='11.5' value="11.5">11:30 am</option>
                <option className = "start" id='12' value="12">12 pm</option>
                <option className = "start" id='12.5' value="12.5">12:30 pm</option>
                <option className = "start" id='13' value="13">1 pm</option>
                <option className = "start" id='13.5' value="13.5">1:30 pm</option>
                <option className = "start" id='14' value="14">2 pm</option>
                <option className = "start" id='14.5' value="14.5">2:30 pm</option>
                <option className = "start" id='15' value="15">3 pm</option>
                <option className = "start" id='15.5' value="15.5">3:30 pm</option>
                <option className = "start" id='16' value="16">4 pm</option>
                <option className = "start" id='16.5' value="16.5">4:30 pm</option>
                <option className = "start" id='17' value="17">5 pm</option>
                <option className = "start" id='17.5' value="17.5">5:30 pm</option>
                <option className = "start" id='18' value="18">6 pm</option>
                <option className = "start" id='18.5' value="18.5">6:30 pm</option>
                <option className = "start" id='19' value="19">7 pm</option>
                <option className = "start" id='19.5' value="19.5">7:30 pm</option>
                <option className = "start" id='20' value="20">8 pm</option>
                <option className = "start" id='20.5'value="20.5">8:30 pm</option>
              </select>
            <label>End Time</label>
            <select required
                        value={end} 
                        onChange={(e) => {
                            setEnd(e.target.value)
                        }}>
               <option className = "end" id='9' value="9">9 am</option>
                <option className = "end" id='9.5' value="9.5">9:30 am</option>
                <option className = "end" id='10' value="10">10 am</option>
                <option className = "end" id='10.5' value="10.5">10:30 am</option>
                <option className = "end" id='11' value="11">11 am</option>
                <option className = "end" id='11.5' value="11.5">11:30 am</option>
                <option className = "end" id='12' value="12">12 pm</option>
                <option className = "end" id='12.5' value="12.5">12:30 pm</option>
                <option className = "end" id='13' value="13">1 pm</option>
                <option className = "end" id='13.5' value="13.5">1:30 pm</option>
                <option className = "end" id='14' value="14">2 pm</option>
                <option className = "end" id='14.5' value="14.5">2:30 pm</option>
                <option className = "end" id='15' value="15">3 pm</option>
                <option className = "end" id='15.5' value="15.5">3:30 pm</option>
                <option className = "end" id='16' value="16">4 pm</option>
                <option className = "end" id='16.5' value="16.5">4:30 pm</option>
                <option className = "end" id='17' value="17">5 pm</option>
                <option className = "end" id='17.5' value="17.5">5:30 pm</option>
                <option className = "end" id='18' value="18">6 pm</option>
                <option className = "end" id='18.5' value="18.5">6:30 pm</option>
                <option className = "end" id='19' value="19">7 pm</option>
                <option className = "end" id='19.5' value="19.5">7:30 pm</option>
                <option className = "end" id='20' value="20">8 pm</option>
                <option className = "end" id='20.5'value="20.5">8:30 pm</option>

              </select>
        </div>
        : <></>}
        <div className='error'>{error}</div>
            <div className='btns'>
            <button className='cancel' onClick={handleClose}>Cancel</button>
            <button onClick={handleNew}>Add</button>
            </div>
            
        </form>
        </Box>
      </Modal>
    </div>
  );
}