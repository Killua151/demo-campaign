import { TAction } from "../../base/types/redux";
import ReducerRegistry from "../../base/redux/ReducerRegistry";
import { ACTION_TYPES } from "./actionTypes";

const initState: any = {
  getSliderContentState: [],
};

const reducer = (state = initState, action: TAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SLIDER_CONTENT_STATE: {
      return {
        ...state,
        getSliderContentState: action.response,
      };
    }
    default:
      return state;
  }
};

ReducerRegistry.register("demo", reducer);
