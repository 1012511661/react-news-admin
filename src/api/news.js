/*
 * @Author:author
 * @Date: 2021-09-26 10:35:08
 * @describe:
 */

import { get } from './https';


// 获取我的新闻列表
export const GetMyNewsData = () => get('/news');
