import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { counterReducer } from "./reducers/counterReducer";

export function useActions() {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...counterReducer.actions,
          ...cartReducer.actions,
        },
        dispatch
      ),
    [dispatch]
  );
}
