  
import "./Dashboard.css";
import pp from "../../Assets/pp.jpg";
import useFetch from "../../Hooks/useFetch";
import AddNewModal from "../../Components/Modals/addNew";
import Edit from "../../Components/Modals/edit";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { Link } from "react-router-dom";
import Delete from "../../Components/Modals/delete";

export default function Dashboard() {


  const userEmail = localStorage.getItem("email");
  const userFname = localStorage.getItem("firstName");
  const userLname = localStorage.getItem("lasttName");
  
  // Getting user's events
  const { data, error } = useFetch(
    `http://localhost:5000/Dashboard/${userEmail}`
  );
  
  // Gets the time displayed on UI in 12 hour format
  const timeFormatHandler = (time) => {
    const t = parseInt(time);
    if(t > 12 && !time.includes('.5')){
      return (t -12 + ':00 pm');
    }
    else if(t > 12 && time.includes('.5')){
      return (t -12 + ':30 pm');
    }
    else if(t < 12 && !time.includes('.5')){
      return (t + ':00 am');
    }
    else if(t < 12 && time.includes('.5')){
      return (t + ':30 am');
    }
    
  }
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
          <h3>My events : {data && data.length}</h3>
        </div>
      </div>
      <div className="tasks">
        <div className="tasks-header">
          <h2>My Events</h2>
          <AddNewModal/>
        </div>
        {data &&
          data.map((event) => {
            if (event.allDay == false) {
              return (
                <div className="user-task" key={event._id}>
                  <div className="task-info">
                    <h4>{event.name}</h4>
                    <h4 className="gray-txt">in <span className="blue-txt">{event.location}</span></h4>
                    <h4 className="gray-txt">from <span className="blue-txt">{timeFormatHandler(event.start)}</span></h4>
                    <h4 className="gray-txt">to <span className="blue-txt">{timeFormatHandler(event.end)}</span></h4>
                    
                  </div>
                  <div className="task-buttons">
                    <button title="View on Table" className="view"><Link to='/Calendar'><CalendarViewMonthIcon/></Link></button>
                    <Edit editId = {event._id}/>
                    <Delete delId={event._id} />
                  </div>
                </div>
              );
            }else if (event.allDay === true) {
                return (
                  <div className="user-task" key={event._id}>
                    <div className="task-info">
                      <h4>{event.name}</h4>
                      <h4 className="gray-txt">at <span className="blue-txt">{event.location}</span></h4>
                      <h4 className="green-txt">All Day</h4>
                    </div>
                    <div className="task-buttons">
                    <button title="View on Table" className="view"><Link to='/Calendar'><CalendarViewMonthIcon/></Link></button>
                    <Edit editId = {event._id}/>
                    <Delete delId={event._id} />
                    </div>
                  </div>
                );
              }
          })}
      </div>
    </div>
  );
}
