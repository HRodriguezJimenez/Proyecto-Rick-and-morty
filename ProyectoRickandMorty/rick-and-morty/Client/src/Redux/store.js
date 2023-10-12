import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";


const composeEnhancer = window._Redux_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;



/*
import { createStore } from "redux";
import { Reducer } from "redux";

const store = createStore(
    rootReducer,
    window._Redux_DEVTOOLS_EXTENSION_&&_Redux_DEVTOOLS_EXTENSION_COMPOSE_()
);

export default store;

 */