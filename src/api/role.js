/*
 * @Author: author
 * @Date: 2021-08-30 10:25:59
 * @describe: 角色 API
 */

import { get, post, patch, del } from './https';

// 获取角色数据
export const GetRoleList = () => get('/roles');

// 添加角色数据
export const PostRoleList = params => post('/roles', params);

// 修改角色数据
export const PatchRoleInfo = (id, params) => patch(`/roles/${id}`, params)

// 删除角色数据
export const DelRoleList = id => del(`/roles/${id}`);
