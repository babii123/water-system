import reducer from './reducer';

import { applyMiddleware, legacy_createStore as createStore } from "redux";
import watchSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
// 用reducer实例化store
const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchSaga);
export default store;
