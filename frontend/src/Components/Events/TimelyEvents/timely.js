import React from "react";
import "./timely.css";
import { timeFormatHandler } from "../../../utils/Events/HelperFunctions/calendarFunctions";

export default function timeEvent({ id, start, end, leftMargin, name, location }) {
  return (
    <div
      className="event"
      id={"event" + id}
      style={{
        height: `${(end - start) * 104}px`,
        marginLeft: `${leftMargin}px`,
      }}
    >
      <span className="gray-text">{timeFormatHandler(start)} - </span>
      <b>{name}</b> <span className="purple-text"> {location}</span>
    </div>
  );
}
