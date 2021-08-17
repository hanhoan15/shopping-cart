import { createStore, applyMiddleware, compose } from "redux";
import reducers from './reducers/index'
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [];
middleware.push(sagaMiddleware);

const createAppStore = compose(applyMiddleware(...middleware))(createStore);
/* eslint-disable no-underscore-dangle */
const store = createAppStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

sagaMiddleware.run(rootSaga);
export default store;