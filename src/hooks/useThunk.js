import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

//This is a custom hook
export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  //This is the function that runs the custom hook
  //To avoid calling this function forever we use a callback
  //And pass dispatch and thunk as the second argument
  //The arg argument is added in case we need some info inside the thunk function
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}
