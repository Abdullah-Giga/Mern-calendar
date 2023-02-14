import { useEffect, useState } from "react";
import axios from "axios";
import { tokenHeader } from "../Constants/Events/constants";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url, {
      headers:tokenHeader
    }).then((res) => {
      setData(res.data)
      if (res.error) {
        throw Error("could not fetch data");
      }
    }).catch((error) => setError(error))
  }, [url]);
  return {data, error};
};

export default useFetch;
