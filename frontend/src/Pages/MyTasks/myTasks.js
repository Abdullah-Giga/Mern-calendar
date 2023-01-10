import React, { useEffect, useState } from "react";
import "./myTasks.css";
import pp from "../../Assets/pp.jpg";
import useFetch from "../../Hooks/useFetch";
import AddNewModal from "../../Components/Modals/addNew";
import Edit from "../../Components/Modals/edit";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { Link } from "react-router-dom";

export default function MyTasks() {
  const [id, setId] = useState('');

  const userEmail = localStorage.getItem("email");
  const userFname = localStorage.getItem("firstName");
  const userLname = localStorage.getItem("lasttName");
  
  // Getting user's events
  const { data, error } = useFetch(
    `http://localhost:5000/myTasks/${userEmail}`
  );
  
  
  // Deleting an event
  const handleDelete = (id) => {
    try {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: "DELETE"
        }).then((res) => res.json().then(() => window.location.reload(false)))
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="myTasks-container">
      <div className="user-card">
        <div className="user-image">
          <img src={pp} alt="user-pic" />
        </div>
        <div className="user-details">
          <h3>
            {userFname} {userLname}
          </h3>
          <h3>{userEmail}</h3>
          <h3>My tasks : {data && data.length}</h3>
        </div>
      </div>
      <div className="tasks">
        <div className="tasks-header">
          <h2>My Tasks</h2>
          {/* <button className="add-new">Add New</button> */}
          <AddNewModal/>
        </div>
        {data &&
          data.map((event) => {
            if (event.allDay == false) {
              return (
                <div className="user-task" key={event._id}>
                  <div className="task-info">
                    <h4>{event.name}</h4>
                    <h4>at {event.location}</h4>
                    <h4>from {event.start}</h4>
                    <h4>to {event.end}</h4>
                    
                  </div>
                  <div className="task-buttons">
                    <button className="view"><Link to='/Calendar'><CalendarViewMonthIcon/></Link></button>
                    <Edit editId = {event._id}/>
                    <button className="delete" onClick={() => handleDelete(event._id)}><DeleteOutlineIcon/></button>
                  </div>
                </div>
              );
            }else if (event.allDay === true) {
                return (
                  <div className="user-task" key={event._id}>
                    <div className="task-info">
                      <h4>{event.name}</h4>
                      <h4>at {event.location}</h4>
                      <h4>All Day</h4>
                    </div>
                    <div className="task-buttons">
                    <button className="view"><Link to='/Calendar'><CalendarViewMonthIcon/></Link></button>
                    <Edit editId = {event._id}/>
                    <button className="delete" onClick={() => handleDelete(event._id)}><DeleteOutlineIcon/></button>
                    </div>
                  </div>
                );
              }
          })}
      </div>
    </div>
  );
}
