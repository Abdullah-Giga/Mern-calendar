import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './modal.css'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import EditIcon from '@mui/icons-material/Edit';


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

export default function Edit({editId}) {
  // Get current User
  const user_email = localStorage.getItem('email');
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // New event handler
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [allDay, setAllDay] = React.useState();
  const[start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [once, setOnce]= React.useState(true);


  
   // Ge data to edit
   const { data, error } = useFetch(
    `http://localhost:5000/event/${editId}`
  );

  
  const editEvent = () => {
    try {
      fetch(`http://localhost:5000/edit/${editId}`, {
        method: 'PUT',
        body: JSON.stringify({start, end, name, location, allDay ,user_email}),
        headers: {"Content-Type": "application/json"}
      })
      .then((res) => {
      if(!res.ok){
        throw Error("Could not edit data");
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


React.useEffect(() => {
    if(data && once){
        setOnce(false)
        setName((n)=>(data.name));
        setLocation((l)=>(data.location));
        setAllDay((a)=>(data.allDay));
        // console.log(al)
        setStart((s)=>(data.start));
        setEnd((e)=>(data.end));
    }
}, [data]);
  

  return (
    <div>
      <button onClick={handleOpen} className = "edit-btn"><EditIcon/></button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
            {data && 
        <form className="modal-form">
            <h1 className="all">Edit Event</h1>
              <label>Event Name</label>
            <input type="text" name="name" defaultValue = {data.name} onChange={(e) => setName((n)=>(e.target.value))} required />
            <label>Event Location</label>
            <input type="text"name="location" defaultValue = {data.location} onChange={(e) => setLocation((l) => (e.target.value))} required  />
            <label>Event Type:</label>
            <div className = "radio">
                <input className="radio-btn" type="radio" id="allDay" name="event_type" value = {true} onChange= {(e) => {
                  console.log(e.target.value)
                  setAllDay((a)=>(e.target.value))
                  }}/>All Day
                <input className="radio-btn" type="radio" id="timely" name="event_type" value = {false} onChange= {(e) => {
                  console.log(e.target.value)
                  setAllDay((a)=>(e.target.value))
                  }} />Timely
              </div>
          
              <div className="time-fields">
            <label>Start Time</label>
            <select name="start" id="start" defaultValue={data.start} onChange={(e) => setStart((s) => (e.target.value))}>
                <option value="9">9 am</option>
                <option value="9.5">9:30 am</option>
                <option value="10">10 am</option>
                <option value="10.5">10:30 am</option>
                <option value="11">11 am</option>
                <option value="11.5">11:30 am</option>
                <option value="12">12 pm</option>
                <option value="12.5">12:30 pm</option>
                <option value="13">1 pm</option>
                <option value="13.5">1:30 pm</option>
                <option value="14">2 pm</option>
                <option value="14.5">2:30 pm</option>
                <option value="15">3 pm</option>
                <option value="15.5">3:30 pm</option>
                <option value="16">4 pm</option>
                <option value="16.5">4:30 pm</option>
                <option value="17">5 pm</option>
                <option value="17.5">5:30 pm</option>
                <option value="18">6 pm</option>
                <option value="18.5">6:30 pm</option>
                <option value="19">7 pm</option>
                <option value="19.5">7:30 pm</option>
                <option value="20">8 pm</option>
                <option value="20.5">8:30 pm</option>
              </select>
            <label>End Time</label>
            <select name="end" id="end" defaultValue={data.end} onChange={(e) => setEnd((e) => (e.target.value))}>
                <option value="9" disabled>9 am</option>
                <option value="9.5">9:30 am</option>
                <option value="10">10 am</option>
                <option value="10.5">10:30 am</option>
                <option value="11">11 am</option>
                <option value="11.5">11:30 am</option>
                <option value="12">12 pm</option>
                <option value="12.5">12:30 pm</option>
                <option value="13">1 pm</option>
                <option value="13.5">1:30 pm</option>
                <option value="14">2 pm</option>
                <option value="14.5">2:30 pm</option>
                <option value="15">3 pm</option>
                <option value="15.5">3:30 pm</option>
                <option value="16">4 pm</option>
                <option value="16.5">4:30 pm</option>
                <option value="17">5 pm</option>
                <option value="17.5">5:30 pm</option>
                <option value="18">6 pm</option>
                <option value="18.5">6:30 pm</option>
                <option value="19">7 pm</option>
                <option value="19.5">7:30 pm</option>
                <option value="20">8 pm</option>
                <option value="20.5">8:30 pm</option>
                <option value="21">9 pm</option>
              </select>
        </div>
            <div className='btns'>
            <button className='cancel' onClick={handleClose}>Cancel</button>
            <button onClick={editEvent}>Save</button>
            </div>
        </form>
}
        </Box>
      </Modal>
    </div>
  );
}