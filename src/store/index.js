import reducer from './reducer';
import _state from './state';
import _action from './action';

import { applyMiddleware, legacy_createStore as createStore } from "redux";
import watchSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
// 用reducer实例化store
export const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchSaga);
// export const store = createStore(reducer);
// 暴露出状态 和 actions方便页面调用
export const state = _state;
export const actions = _action;