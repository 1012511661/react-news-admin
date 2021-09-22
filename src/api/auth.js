/*
 * @Author: author
 * @Date: 2021-08-30 10:18:36
 * @describe:
 */

import { get, post, put, del } from './https';

// 获取权限模板数据
export const GetAuthTemplateList = () => get('/authsTemplate');

// 获取权限列表
export const GetAuthList = () => get('/auths');

// 查询某个角色权限
export const GetAuthInfo = id => get(`/auths/${id}`);

// 添加某个角色权限
export const PostAuthInfo = params => post('/auths', params);

// 修改某个角色权限
export const PatchAuthInfo = (id, params) => put(`/auths/${id}`, params)

// 删除某个角色权限
export const DelAuthInfo = (id) => del(`/auths/${id}`)
