import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
};

export default function Edit({ editId }) {
  // Get current User
  const user_email = localStorage.getItem("email");
  const navigate = useNavigate();
  
  // city names api handlers
  const [cities, setCities] = React.useState([]);
  let Arr = [];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // New event handler
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [allDay, setAllDay] = React.useState();
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [once, setOnce] = React.useState(true);
  const [errors, setErrors] = React.useState("");

  // Ge data to edit
  const { data, error } = useFetch(`http://localhost:5000/event/${editId}`);

  const editEvent = () => {
    try {
      fetch(`http://localhost:5000/edit/${editId}`, {
        method: "PUT",
        body: JSON.stringify({
          start,
          end,
          name,
          location,
          allDay,
          user_email,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          setErrors("Could not save data. Make sure all fields are full");
        }
        res.json().then((data) => {
          console.log(data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Disabling end time tha is smaller than start time
  const disable = (e) => {
    var id = "";
    document.querySelectorAll(".start").forEach((opt) => {
      if (opt.value === e.target.value) {
        id = opt.id;
        setStart((s) => id);
      }
    });
    document.querySelectorAll(".end").forEach((opt) => {
      if (parseFloat(opt.id) <= parseFloat(id)) {
        opt.disabled = true;
      }
    });
  };

  // For removing duplicates in the cities API
  function removeDuplicates(arr) {
    var unique = [];
    arr.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }

  // Get all the cities of Pakistan from this API
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
    const data = await response.json();

    data.results.forEach((city) => {
      Arr.push(city.name);
    });
    setCities(removeDuplicates(Arr));
  };

  React.useEffect(() => {
    getLocations();
  }, []);

  React.useEffect(() => {
    if (data && once) {
      setOnce(false);
      setName((n) => data.name);
      setLocation((l) => data.location);
      setAllDay((a) => data.allDay);
      setStart((s) => data.start);
      setEnd((se) => data.end);
      getLocations();
    }
  }, [data]);

  return (
    <div>
      <button title="Edit this event" onClick={handleOpen} className="edit-btn">
        <EditIcon />
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {data && (
            <form className="modal-form">
              <h1 className="all">Edit Event</h1>
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                defaultValue={data.name}
                onChange={(e) => setName((n) => e.target.value)}
                required
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cities && cities}
                sx={{ width: "100%", height: "50px" }}
                defaultValue={data.location}
                onChange={(e) => setLocation(e.target.textContent)}
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
                  name="event_type"
                  value={true}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAllDay((a) => e.target.value);
                  }}
                />
                All Day
                <input
                  className="radio-btn"
                  type="radio"
                  id="timely"
                  name="event_type"
                  value={false}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAllDay((a) => e.target.value);
                  }}
                />
                Timely
              </div>

              <div className="time-fields">
                <label>Start Time</label>
                <select
                  defaultValue={start}
                  required
                  onChange={(e) => {
                    setStart((s) => e.target.value);
                    disable(e);
                  }}
                >
                  <option className="start" id="9" value="9">
                    9 am
                  </option>
                  <option className="start" id="9.5" value="9.5">
                    9:30 am
                  </option>
                  <option className="start" id="10" value="10">
                    10 am
                  </option>
                  <option className="start" id="10.5" value="10.5">
                    10:30 am
                  </option>
                  <option className="start" id="11" value="11">
                    11 am
                  </option>
                  <option className="start" id="11.5" value="11.5">
                    11:30 am
                  </option>
                  <option className="start" id="12" value="12">
                    12 pm
                  </option>
                  <option className="start" id="12.5" value="12.5">
                    12:30 pm
                  </option>
                  <option className="start" id="13" value="13">
                    1 pm
                  </option>
                  <option className="start" id="13.5" value="13.5">
                    1:30 pm
                  </option>
                  <option className="start" id="14" value="14">
                    2 pm
                  </option>
                  <option className="start" id="14.5" value="14.5">
                    2:30 pm
                  </option>
                  <option className="start" id="15" value="15">
                    3 pm
                  </option>
                  <option className="start" id="15.5" value="15.5">
                    3:30 pm
                  </option>
                  <option className="start" id="16" value="16">
                    4 pm
                  </option>
                  <option className="start" id="16.5" value="16.5">
                    4:30 pm
                  </option>
                  <option className="start" id="17" value="17">
                    5 pm
                  </option>
                  <option className="start" id="17.5" value="17.5">
                    5:30 pm
                  </option>
                  <option className="start" id="18" value="18">
                    6 pm
                  </option>
                  <option className="start" id="18.5" value="18.5">
                    6:30 pm
                  </option>
                  <option className="start" id="19" value="19">
                    7 pm
                  </option>
                  <option className="start" id="19.5" value="19.5">
                    7:30 pm
                  </option>
                  <option className="start" id="20" value="20">
                    8 pm
                  </option>
                  <option className="start" id="20.5" value="20.5">
                    8:30 pm
                  </option>
                </select>
                <label>End Time</label>
                <select
                  required
                  defaultValue={end}
                  onChange={(e) => {
                    setEnd((se) => e.target.value);
                  }}
                >
                  <option className="end" id="9" value="9">
                    9 am
                  </option>
                  <option className="end" id="9.5" value="9.5">
                    9:30 am
                  </option>
                  <option className="end" id="10" value="10">
                    10 am
                  </option>
                  <option className="end" id="10.5" value="10.5">
                    10:30 am
                  </option>
                  <option className="end" id="11" value="11">
                    11 am
                  </option>
                  <option className="end" id="11.5" value="11.5">
                    11:30 am
                  </option>
                  <option className="end" id="12" value="12">
                    12 pm
                  </option>
                  <option className="end" id="12.5" value="12.5">
                    12:30 pm
                  </option>
                  <option className="end" id="13" value="13">
                    1 pm
                  </option>
                  <option className="end" id="13.5" value="13.5">
                    1:30 pm
                  </option>
                  <option className="end" id="14" value="14">
                    2 pm
                  </option>
                  <option className="end" id="14.5" value="14.5">
                    2:30 pm
                  </option>
                  <option className="end" id="15" value="15">
                    3 pm
                  </option>
                  <option className="end" id="15.5" value="15.5">
                    3:30 pm
                  </option>
                  <option className="end" id="16" value="16">
                    4 pm
                  </option>
                  <option className="end" id="16.5" value="16.5">
                    4:30 pm
                  </option>
                  <option className="end" id="17" value="17">
                    5 pm
                  </option>
                  <option className="end" id="17.5" value="17.5">
                    5:30 pm
                  </option>
                  <option className="end" id="18" value="18">
                    6 pm
                  </option>
                  <option className="end" id="18.5" value="18.5">
                    6:30 pm
                  </option>
                  <option className="end" id="19" value="19">
                    7 pm
                  </option>
                  <option className="end" id="19.5" value="19.5">
                    7:30 pm
                  </option>
                  <option className="end" id="20" value="20">
                    8 pm
                  </option>
                  <option className="end" id="20.5" value="20.5">
                    8:30 pm
                  </option>
                </select>
              </div>
              <div className="error">{errors}</div>
              <div className="btns">
                <button className="cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button onClick={editEvent}>Save</button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}
