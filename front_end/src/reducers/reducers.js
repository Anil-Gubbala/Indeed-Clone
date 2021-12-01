import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import auth from "./auth";

const reducers = combineReducers({ errorReducer, auth });

export default reducers;
