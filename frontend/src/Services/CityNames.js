import { GET_CITIES, CITIES_HEADER } from "../Constants/Events/constants";


let temp_arr = [];
  // Get all the cities of Pakistan from this API
  export const getCities = async () => {
    
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $exists: true,
        },
      })
    );
    const response = await fetch(
      GET_CITIES(where),
      {
        headers: CITIES_HEADER,
      }
    );
    const data = await response.json();

    data.results.forEach((city) => {
      temp_arr.push(city.name)
    })
    return temp_arr;
  };
