/*
 * @Author: author
 * @Date: 2021-09-09 11:43:28
 * @describe: 公共变量
 */

// 状态颜色

const EDIT = '#87D068'; // 编辑中
const AUDIT = '#2DB7F5'; // 审核中
const ADOPT = '#108EE9'; // 已通过
const REJECT = '#F50'; // 已驳回

// 模拟接口明细 db.json
export const Data_JSON = {
	posts: '文件列表',
	comments: '文件详情',
	menus: '栏目列表',
	auths: '权限列表',
	authsTemplate: '权限模板列表(内置)',
	roles: '角色列表',
	news: '我的新闻列表'
}

// 新闻状态
export const NEWS_STATUS_LIST = [
	{
		value: 0,
		label: '编辑中',
		color: EDIT
	},
	{
		value: 1,
		label: '审核中',
		color: AUDIT
	},
	{
		value: 2,
		label: '已通过',
		color: ADOPT
	},
	{
		value: 3,
		label: '已驳回',
		color: REJECT
	}
]
