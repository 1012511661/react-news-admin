/*
* @Author: author
* @Date: 2021-09-10 17:38:23
* @describe: 用户 API
*/

import { get, post, del } from './https';

// 获取用户数据
export const GetUserList = () => get('/users');

// 删除用户数据
export const DelUserList = id => del(`/users/${id}`);

// 添加用户数据
export const PostUserList = params => post('/users', params);
