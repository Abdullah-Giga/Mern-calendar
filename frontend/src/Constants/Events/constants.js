import { outLocal } from "../../utils/Users/HelperFunctions";
import { serverAddress } from "../User/userConsants";

// request header
const token = outLocal('token');
export const tokenHeader = {'authorization': `Bearer ${token}`}

//request routes
export const GET_EVENTS =  serverAddress+`/events/`;

export const ADD_NEW_EVENT = serverAddress + "/events/";


export const SINGLE_EVENT = (prop) => {
  return serverAddress+`/events/event/${prop}`;
};

export const GET_CITIES = (prop) => {
  return `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${prop}`;
};

export const CITIES_HEADER = {
  "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J",
  "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS",
};

// time slots to render on the calendar page
export const timeSlots = [];
for(let i = 9; i<= 20.5; i+= 0.5){
  timeSlots.push(i.toString());
}
