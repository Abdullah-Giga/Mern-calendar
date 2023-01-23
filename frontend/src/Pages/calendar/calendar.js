import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import "./calendar.css";

export default function Calendar() {
  const user_email = localStorage.getItem("email");

  let objArr = [];
  let all_Day = [];

  const { data, error } = useFetch(
    `http://localhost:5000/Dashboard/${user_email}`
  );

  const divide = () => {
    data.forEach((element) => {
      if (element.allDay) {
        all_Day.push(element);
      } else {
        objArr.push(element);
      }
      //   console.log(all_Day)
    });
    // Sorting array wrt the time sequence
    objArr.sort(function (a, b) {
      return a.start - b.start;
    });
  };

  // Sorting array wrt the time sequence
  objArr.sort(function (a, b) {
    return a.start - b.start;
  });

  // Function to hande 24 hour format
  function time(start) {
    if (start > 12) {
      return start - 12;
    } else {
      return start;
    }
  }

  // All day task function
  function render_all_Day() {
    let j = document.getElementById("8");
    for (let i = 0; i < all_Day.length; i++) {
      j.innerHTML += `
                    <div class = "item-all" id = "All-day-${i}">
                    <span className="gray-text">All Day- </span><b>${all_Day[i].name}</b> <span className="green-text"> ${all_Day[i].location}</span>
                    </div>
                    `;
    }
  }

  // Makng a new div for every scheduled task
  const getDiv = (h, count, id, start, name, location) => {
    let div = `
      <div class="r-item r-item-full" id = "event-${count}" style = "height : ${h};">
      <span class="gray-text">${time(
        start
      )}:00 - </span><b>${name}</b> <span className="green-text"> ${location}</span>
      </div>`;
    return div;
  };

  // Making new dv to handle time starting with .5 or :30 minute format

  const getDivHalf = (h, count, id, start, name, location) => {
    let div = `
      <div class="r-item r-item-half" id = "event-${count}" style = "height : ${h};">
      <span>${Math.trunc(
        time(start)
      )}:30 - </span><b>${name}</b> <span> ${location}</span>
      </div>`;
    return div;
  };

  // Find if collision occurs between two divs
  function collision_helper(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();
    const isInHoriztonalBounds =
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds =
      rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
    return isOverlapping;
  }

  const getMargin = (parent) => {
    const grandParent = document.getElementById("main-div");
    const rectParent = parent.getBoundingClientRect();
    const rectMain = grandParent.getBoundingClientRect();
    return rectMain.width - rectParent.width;
  };

  // Checking the collision and making divs responsive
  function collision() {
   
    for (let i = 1; i < objArr.length; i++) {
      let j = i - 1;

      if (
        collision_helper(
          document.getElementById(`event-${j}`),
          document.getElementById(`event-${i}`)
        ) &&
        objArr[i].start != objArr[j].start
      ) {
        let parent = document.getElementById(`event-${j}`);
        let child = document.getElementById(`event-${i}`);

        console.log(parent.id + " is parent of" + child.id);
        console.log(getMargin(parent))
        // console.log(parent.clientWidth)
        child.style.marginLeft = `${getMargin(parent) - 360}px`;
        console.log(child.id + "------>" +child.style.marginLeft)
      }
    }
  }

  // Rendering all the new task divs

  const render = () => {
    let count = -1;
    console.log((10.5 - 10) * 120);
    objArr.forEach((e) => {
      let j = document.getElementById(e.start);
      

      if (e.start == j.id && j.id.includes(".5")) {
        count++;
        let h = `${(e.end - e.start) * 122}px`;
        j.innerHTML += getDivHalf(h, count, e._id, e.start, e.name, e.location);
      } else if (e.start == j.id && !j.id.includes(".5")) {
        count++;
        let h = `${(e.end - e.start) * 122}px`;
        j.innerHTML += getDiv(h, count, e._id, e.start, e.name, e.location);
      }
    });
  };
  // function calls
  if (data) {
    divide();
    render_all_Day();
    render();
    collision();
  }

  return (
    <div className="container">
      <div className="main" id="main-div">
        <div className="header">
          <div className="date">Friday,April 1</div>
        </div>
        <div className="all-day" id="8"></div>
        <div className="am">
          <div className="heading-am">
            <h1>AM</h1>
          </div>
          <div className="time-divs-am">
            <div className="_9-am main-am">
              <h2>9:00</h2>
              <div className="items" id="9"></div>
            </div>
            <div className="9:30-am sub-am">
              9:30
              <div className="items" id="9.5"></div>
            </div>
            <div className="_10-am main-am">
              <h2>10:00</h2>
              <div className="items" id="10"></div>
            </div>
            <div className="_10:30-am sub-am">
              10:30
              <div className="items-s" id="10.5"></div>
            </div>
            <div className="_11-am main-am">
              <h2>11:00</h2>
              <div className="items" id="11"></div>
            </div>
            <div className="_11:30am sub-am">
              11:30
              <div className="items-s" id="11.5"></div>
            </div>
          </div>
        </div>
        <div className="pm">
          <div className="heading-pm">
            <h1>PM</h1>
          </div>
          <div className="time-divs-pm">
            <div className="_12-pm main-pm">
              <h2>12:00</h2>
              <div className="items" id="12"></div>
            </div>
            <div className="_12:30am sub-pm">
              12:30
              <div className="items-s" id="12.5"></div>
            </div>
            <div className="1-pm main-pm">
              <h2>1:00</h2>
              <div className="items" id="13"></div>
            </div>
            <div className="_1:30-pm sub-pm">
              1:30
              <div className="items-s" id="13.5"></div>
            </div>
            <div className="2-pm main-pm">
              <h2>2:00</h2>
              <div className="items" id="14"></div>
            </div>
            <div className="_2:30-pm sub-pm">
              2:30
              <div className="items-s" id="14.5"></div>
            </div>
            <div className="3-pm main-pm">
              <h2>3:00</h2>
              <div className="items" id="15"></div>
            </div>
            <div className="_3:30-pm sub-pm">
              3:30
              <div className="items-s" id="15.5"></div>
            </div>
            <div className="4-pm main-pm">
              <h2>4:00</h2>
              <div className="items" id="16"></div>
            </div>
            <div className="_4:30-pm sub-pm">
              4:30
              <div className="items-s" id="16.5"></div>
            </div>
            <div className="5-pm main-pm">
              <h2>5:00</h2>
              <div className="items" id="17"></div>
            </div>
            <div className="_5:30-pmm sub-pm">
              5:30
              <div className="items-s" id="17.5"></div>
            </div>
            <div className="6-pm main-pm">
              <h2>6:00</h2>
              <div className="items" id="18"></div>
            </div>
            <div className="_6:30-pm sub-pm">
              6:30
              <div className="items-s" id="18.5"></div>
            </div>
            <div className="7-pm main-pm">
              <h2>7:00</h2>
              <div className="items" id="19"></div>
            </div>
            <div className="_7:30-pm sub-pm">
              7:30
              <div className="items-s" id="19.5"></div>
            </div>
            <div className="8-pm main-pm">
              <h2>8:00</h2>
              <div className="items" id="20"></div>
            </div>
            <div className="_8:30-pm sub-pm">
              8:30
              <div className="items-s" id="20.5"></div>
            </div>
            <div className="main-pm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
