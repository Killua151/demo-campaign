import { Dispatch, Store } from "redux";
import { TActionRequest } from "../../base/types/redux";
import MiddlewareRegistry from "../../base/redux/MiddlewareRegistry";
// import { 
//   GetSliderContentRequest,
// } from "../utils/types";
import { 
  // apiGetSliderContent,
} from "./services";
import { ACTION_TYPES } from "./actionTypes";
// import { 
//   setSliderContentState, 
  
// } from "./actions";
// import { message } from 'antd';

export const middleware =
  ({ dispatch, getState }: Store) =>
  (next: Function) =>
  async (action: TActionRequest<any>) => {
    next(action);
    switch (action.type) {
      case ACTION_TYPES.GET_SLIDER_CONTENT: {
        // return await handleFilterEkyc(dispatch, action, getState);
      }
    }
  };

MiddlewareRegistry.register(middleware);

const handleFilterEkyc = async (
  dispatch: Dispatch,
  // action: TActionRequest<GetSliderContentRequest>,
  getState: () => {  }
) => {
  try {
    // dispatch(setSliderContentState({ isFetching: true, isSuccess: false, data: null }));
    // const response = await apiGetSliderContent(action.params!);
    // console.log("res: ", response.contents)
    // if (response) {
    //   dispatch(setSliderContentState({ isFetching: false, isSuccess: true, data: response.contents }));
    // }
  } catch (err: any) {
    // message.error(err.response?.data.status.message);
    // dispatch(setSliderContentState({ isFetching: false, isSuccess: false, data: err }));
  }
};