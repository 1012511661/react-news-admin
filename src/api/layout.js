/*
 * @Author: author
 * @Date: 2021-08-26 15:51:22
 * @describe:
 */
import { get } from "./https";

// 获取菜单数据
export const GetMenuList = () => get("/menus");
