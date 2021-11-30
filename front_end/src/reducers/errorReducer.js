import { ACTION, STATE } from "./reducerConst";

const initialState = {
  [STATE.ERR_MSG]: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SHOWERROR:
      return {
        ...state,
        [STATE.ERR_MSG]: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
