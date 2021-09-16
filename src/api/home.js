/*
 * @Author:author
 * @Date: 2021-08-02 15:43:08
 * @describe:
 */

import { get } from "./https";

// 获取数据
export const GetListData = () => get("/posts");

// 获取某个详情
export const GetDataId = (id) => get(`/posts/${id}`);
