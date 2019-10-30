import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import authReducer from "./reducers/authReducer";
import profReducer from "./reducers/profReducer";
import postsReducer from "./reducers/postsReducer";

const rootReducer = combineReducers({
  authReducer,
  profReducer,
  postsReducer
});

export default createStore(rootReducer, applyMiddleware(promise));
