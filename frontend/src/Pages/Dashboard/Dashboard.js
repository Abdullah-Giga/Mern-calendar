import "./Dashboard.css";
import pp from "../../Assets/pp.jpg";
import useFetch from "../../Hooks/useFetch";
import AddNewModal from "../../Components/Events/Modals/addNew";
import Edit from "../../Components/Events/Modals/edit";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { Link } from "react-router-dom";
import Delete from "../../Components/Events/Modals/delete";
import { GET_EVENTS } from "../../Constants/Events/constants";
import { outLocal } from "../../utils/Users/HelperFunctions";
import { timeFormatHandler } from "../../utils/Events/HelperFunctions/calendarFunctions";

export default function Dashboard() {
  // Getting user's events
  const { data, error } = useFetch(GET_EVENTS);

  return (
    <div className="myTasks-container">
      <div className="user-card">
        <div className="user-image">
          <img src={pp} alt="user-pic" />
        </div>
        <div className="user-details">
          <h3>
            {outLocal("fName")} {outLocal("lName")}
          </h3>
          <h3>{outLocal("email")}</h3>
          <h3>My events : {data && data.length}</h3>
        </div>
      </div>
      <div className="tasks">
        <div className="tasks-header">
          <h2>My Events</h2>
          <AddNewModal />
        </div>
        {data &&
          data.map((event) => {
            if (event.allDay == false) {
              return (
                <div className="user-task" key={event._id}>
                  <div className="task-info">
                    <h4>{event.name}</h4>
                    <h4 className="gray-txt">
                      in <span className="blue-txt">{event.location}</span>
                    </h4>
                    <h4 className="gray-txt">
                      from{" "}
                      <span className="blue-txt">
                        {timeFormatHandler(event.start)}
                      </span>
                    </h4>
                    <h4 className="gray-txt">
                      to{" "}
                      <span className="blue-txt">
                        {timeFormatHandler(event.end)}
                      </span>
                    </h4>
                  </div>
                  <div className="task-buttons">
                    <button title="View on Table" className="view">
                      <Link to="/Calendar">
                        <CalendarViewMonthIcon />
                      </Link>
                    </button>
                    <Edit editId={event._id} />
                    <Delete delId={event._id} />
                  </div>
                </div>
              );
            } else if (event.allDay === true) {
              return (
                <div className="user-task" key={event._id}>
                  <div className="task-info">
                    <h4>{event.name}</h4>
                    <h4 className="gray-txt">
                      at <span className="blue-txt">{event.location}</span>
                    </h4>
                    <h4 className="green-txt">All Day</h4>
                  </div>
                  <div className="task-buttons">
                    <button title="View on Table" className="view">
                      <Link to="/Calendar">
                        <CalendarViewMonthIcon />
                      </Link>
                    </button>
                    <Edit editId={event._id} />
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
