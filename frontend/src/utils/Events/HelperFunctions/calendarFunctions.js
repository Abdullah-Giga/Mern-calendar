// Gets the time displayed on UI in 12 hour format
export const timeFormatHandler = (time) => {
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
  else if(t == 12 && !time.includes('.5')){
    return (t + ':00 pm');
  }
  else if(t == 12 && time.includes('.5')){
    return (t + ':30 pm');
  }
}


// divide all day events and timely events into two different arrays
export const divide = (data) => {
  let arr1 = [],
    arr2 = [];
  data?.forEach((element) => {
    if (element.allDay) {
      arr1.push(element);
    } else {
      arr2.push(element);
    }
  })
  arr2.sort(function (a, b) {
    return a.start - b.start;
  });
  return [arr1, arr2]
}


// checking collision
export const checkCol = (events) => {
  const collidingEvents = [];

  let prevEnd = parseFloat(events[0]?.end),
    tempArr = [events[0]];
  for (let i = 1; i < events.length; i++) {
    if (parseFloat(events[i].start) < prevEnd) {
      tempArr.push(events[i]);
      prevEnd = Math.max(prevEnd, parseFloat(events[i].end));
    } else {
      collidingEvents.push(tempArr);
      tempArr = [events[i]];
      prevEnd = parseFloat(events[i].end);
    }
  }
  collidingEvents.push(tempArr);
  return collidingEvents;
};

