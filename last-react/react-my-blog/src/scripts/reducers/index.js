



import { combineReducers } from 'redux'

import { count } from './data'//数据来源


export const reducers = combineReducers({
    data: count
});