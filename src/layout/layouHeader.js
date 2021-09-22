/*
 * @Author:author
 * @Date: 2021-08-21 14:59:43
 * @describe:
 */

import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AlertOutlined } from '@ant-design/icons';
import store from '../store';
import { CHANGE_MENU_TYPE, CHANGE_THEME_TYPE } from '../store/aciton/type';
import { TOKEN } from '../js/storage';
import './layout.less';

const { Header } = Layout;

// 有状态组件
export default class TopHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: store.getState().publicReducer.collapsed,
			theme: store.getState().publicReducer.theme
		};
		store.subscribe(() => {
			this.setState({
				collapsed: store.getState().publicReducer.collapsed,
				theme: store.getState().publicReducer.theme
			});
		});
	}

	onChangeCollapsed = () => {
		store.dispatch({ type: CHANGE_MENU_TYPE, value: !this.state.collapsed });
	};
	onChangeTheme = () => {
		store.dispatch({ type: CHANGE_THEME_TYPE, value: !this.state.theme });
	}
	menu = () => {
		return (
			<Menu onClick={this.onClickMenu}>
                <Menu.Item key="0">个人中心</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="1">退出</Menu.Item>
            </Menu>
		);
	};
	onClickMenu = (e) => {
		if (e.key === '1') {
			TOKEN.clear();
			// this.props.history.replace('/');
		}
	}

	render() {
		let { collapsed } = this.state
		return (
			<Header className="header-warp">
                {collapsed ? <MenuUnfoldOutlined onClick={this.onChangeCollapsed}/> :
	                <MenuFoldOutlined onClick={this.onChangeCollapsed}/>}
				<div className="header-warp-right">
                    <AlertOutlined title='改变主题风格' className='icons' onClick={this.onChangeTheme}/>
					{/*<span>欢迎回家</span>*/}
					<Dropdown overlay={this.menu} trigger={['hover']}>
                        {/*href='#!' 禁止跳转*/}
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()} href='#!'>管理员</a>
                    </Dropdown>
                </div>
            </Header>
		);
	}
}
