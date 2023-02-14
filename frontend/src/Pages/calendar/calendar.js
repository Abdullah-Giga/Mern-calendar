import React, { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import "./calendar.css";
import { GET_EVENTS, timeSlots } from "../../Constants/Events/constants";
import AllDayEvent from "../../Components/Events/AllDayEvents/allDay";
import Event from "../../Components/Events/TimelyEvents/timely";
import {
  timeFormatHandler,
  divide,
  checkCol,
} from "../../utils/Events/HelperFunctions/calendarFunctions";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [allDayEvents, setAllDayEvents] = useState([]);


  // Get all events
  const { data, error } = useFetch(GET_EVENTS);

  useEffect(() => {
    if (data?.length !== 0) {
      const [AllDay, TimelyEvent] = divide(data);
      setEvents(checkCol(TimelyEvent));
      setAllDayEvents(AllDay);
    }
  }, [data]);

  return (
    <div className="calendar-container">
      <div className="calendar-main">
        <div className="header">
          <div className="date">Friday,April 1 </div>
        </div>
        <div className="all-day-container" id="_8">
          {allDayEvents &&
            allDayEvents.map((event, index) => {
              return (
                <AllDayEvent
                  key={index}
                  id={`All-day-${index}`}
                  name={event.name}
                  location={event.location}
                />
              );
            })}
        </div>
        <div className="time-slots">
          {timeSlots.map((time, index) => (
            <div className="main" id={`main-${time}`} key={index}>
              <div className="sub-1" id={time}>
                <h4>{timeFormatHandler(time)}</h4>
                {events?.map((event) =>
                  event?.map((e, idx) => {
                    if (time == e?.start) {
                      return (
                        <Event
                          key={idx}
                          id={time}
                          start={e.start}
                          end={e.end}
                          name={e.name}
                          location={e.location}
                          leftMargin={100 * (idx + 1)}
                        />
                      );
                    }
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
