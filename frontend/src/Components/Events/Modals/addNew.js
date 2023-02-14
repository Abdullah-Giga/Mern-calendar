import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./modal.css";
import { Autocomplete, TextField } from "@mui/material";
import { ADD_NEW_EVENT } from "../../../Constants/Events/constants";
import {
  getLocations,
  options,
} from "../../../utils/Events/HelperFunctions/eventModals";
import { outLocal } from "../../../utils/Users/HelperFunctions";
import { timeFormatHandler } from "../../../utils/Events/HelperFunctions/calendarFunctions";

export default function AddNew() {
  // Cities API handlers
  const [cities, setCities] = React.useState([]);

  // Get current User
  const token = outLocal("token");

  // Modal handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = React.useState("");

  const [data, setData] = React.useState({
    name: "",
    location: "",
    allDay: true,
    start: "9",
    end: "9.5",
  });

  // Adding New event in the database
  const AddNewEvent = () => {
    axios
      .post(
        ADD_NEW_EVENT,
        {
          start: data.start,
          end: data.end,
          name: data.name,
          location: data.location,
          allDay: data.allDay,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.error) {
          setError("Could not save data. Make sure all fields are full");
          handleOpen();
        }
      });
  };

  React.useEffect(() => {
    getLocations(setCities);
  }, []);

  return (
    <div>
      <Button className="blue-btn" title="Add a new event" onClick={handleOpen}>
        <span className="blue-txt">Add New</span>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <form className="modal-form">
            <h1 className="all">Add a New Event</h1>
            <label>Event Name</label>

            <input
              type="text"
              name="name"
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
              required
            />
            <Autocomplete
              required
              disablePortal
              id="combo-box-demo"
              options={cities && cities}
              sx={{ width: "100%", height: "50px" }}
              onChange={(e) =>
                setData({
                  ...data,
                  location: e.target.textContent,
                })
              }
              renderInput={(params) => (
                <TextField {...params} label="Location" />
              )}
            />
            <label>Event Type:</label>
            <div className="radio">
              <input
                className="radio-btn"
                type="radio"
                id="allDay"
                required
                name="event_type"
                onChange={(e) =>
                  setData({
                    ...data,
                    allDay: true,
                  })
                }
              />
              All Day
              <input
                className="radio-btn"
                type="radio"
                id="timely"
                required
                name="event_type"
                value={false}
                onChange={(e) =>
                  setData({
                    ...data,
                    allDay: false,
                  })
                }
              />
              Timely
            </div>
            {data.allDay == false ? (
              <div className="time-fields">
                <label>Start Time</label>
                <select
                  required
                  value={data.start}
                  onChange={(e) =>
                    setData({
                      ...data,
                      start: e.target.value,
                    })
                  }
                >
                  {options &&
                    options.map(
                      (
                        opt // Renders a list of times in dropdown
                      ) => (
                        <option
                          className="start"
                          id={opt}
                          key={options.indexOf(opt)}
                          value={opt}
                        >
                          {timeFormatHandler(opt)}
                        </option>
                      )
                    )}
                </select>
                <label>End Time</label>
                <select
                  required
                  value={data.end}
                  onChange={(e) =>
                    setData({
                      ...data,
                      end: e.target.value,
                    })
                  }
                >
                  {options &&
                    options.map(
                      (
                        opt // Renders a list of times in dropdown
                      ) => (
                        <option
                          className="end"
                          id={opt}
                          key={options.indexOf(opt)}
                          value={opt}
                        >
                          {timeFormatHandler(opt)}
                        </option>
                      )
                    )}
                </select>
              </div>
            ) : (
              <></>
            )}
            <div className="error">{error}</div>
            <div className="btns">
              <button className="cancel" onClick={handleClose}>
                Cancel
              </button>
              <button onClick={AddNewEvent}>Add</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
