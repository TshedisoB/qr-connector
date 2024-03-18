import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import barCodeReducer from "./reducers";

const store = createStore(barCodeReducer, applyMiddleware(thunk));

export default store;
