import { getCities } from "../../../Services/CityNames";

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

// Get all the cities of Pakistan from this function
export const getLocations = async (setState) => {
  const arr = await getCities(); // This function usees third party api to fetch cities
  setState(removeDuplicates(arr)); // Setting Cities state
};

export let options = [];
for (let i = 9; i <= 20.5; i += 0.5) {
  options.push(i.toString());
}
