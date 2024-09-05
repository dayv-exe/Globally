import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCountries } from "../redux/selectedCountrySlice";
let calls = 0;

const useFetch = (url, cacheData = false) => {
  const cachedCountries = useSelector(
    (state) => state.selectedCountry.allCountries
  );
  const dispatch = useDispatch();
  const [refreshCount, setRefreshCount] = useState(0);
  const refresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortCtrl = new AbortController();
    calls += 1;
    setIsPending(true);
    setData(null);
    setError(null);
    if (
      calls > 1 &&
      cacheData &&
      cachedCountries &&
      cachedCountries.length > 0
    ) {
      setIsPending(false);
      setData(cachedCountries);
      setError(null);
    } else {
      // make api call
      fetch(url, { signal: abortCtrl.signal })
        .then((res) => {
          if (!res.ok) throw Error("Failed to fetch.");

          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);

          if (!cacheData) return;
          dispatch(setAllCountries(data));
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          setIsPending(false);
          setData(null);
          setError(err.message);

          // if unable to load from api
          //loadFromMemory();
        });
    }

    return () => abortCtrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refreshCount, cacheData]);

  return { data, error, isPending, refresh };
};

export default useFetch;
