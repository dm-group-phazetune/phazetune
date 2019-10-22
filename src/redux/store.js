import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  authReducer
});

export default createStore(rootReducer, applyMiddleware(promise));
