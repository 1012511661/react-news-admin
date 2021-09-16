/*
 * @Author: author
 * @Date: 2021-08-28 17:54:09
 * @describe: 全局变量
 */

import {CHANGE_MENU_TYPE, CHANGE_THEME_TYPE} from '../aciton/type';

const publicState = {
    collapsed: false,
    theme: true // false：dark ，true：light
};
const publicReducer = (state = publicState, action) => {
    let {type, value} = action;
    let _state = JSON.parse(JSON.stringify(state)); //深度拷贝state
    switch (type) {
        case CHANGE_MENU_TYPE:
            _state.collapsed = value;
            return _state;
        case CHANGE_THEME_TYPE:
            _state.theme = value;
            return _state;
        default:
            return state;
    }
};
export default publicReducer;
