import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

//   const [pending, setPending] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
  
    fetch(url).then((res) => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }
      res.json()
        .then((data) => {
          setData(data);
          // setPending(false);
        })
        .catch((err) => {
          // setPending(true);
          setError(err.message);
        });
    })
  }, [url]);
  return {data, error};
};

export default useFetch;
