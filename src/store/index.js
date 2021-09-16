/*
 * @Author: author
 * @Date: 2021-08-28 17:50:45
 * @describe:
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducerList from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducerList, enhancer); // 创建数据存储仓库
export default store; //暴露出去
