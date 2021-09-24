/*
 * @Author: author
 * @Date: 2021-08-28 17:55:49
 * @describe: 集合
 */

import { combineReducers } from 'redux';
import publicReducer from './reducer/state';
import listReducer from './reducer/list';

const reducerList = combineReducers({ publicReducer, listReducer });
export default reducerList;
