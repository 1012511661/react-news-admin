/*
 * @Author: author
 * @Date: 2021-08-30 10:18:36
 * @describe:
 */

import {get} from './https';

// 获取权限模板数据
export const GetAuthTemplateList = () => get('/authsTemplate');

// 获取权限列表
export const GetAuthList = () => get('/auths');
