import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import authReducer from "./reducers/authReducer";
import profReducer from './reducers/profReducer'

const rootReducer = combineReducers({
  authReducer,
  profReducer
});

export default createStore(rootReducer, applyMiddleware(promise));
