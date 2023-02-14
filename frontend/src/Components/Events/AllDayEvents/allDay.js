import React from "react";
import './allDay.css'

export default function allDay({id, name, location}) {
  return (
    <div className="allDay-event" id={id}>
      <span className="gray-text">All Day- </span>
      <b>{name}</b>
      <span className="green-text"> {location}</span>
    </div>
  );
}
