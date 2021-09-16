/*
 * @Author:author
 * @Date: 2021-08-21 14:59:43
 * @describe:
 */

import React, {Component} from 'react';
import {Layout, Menu, Dropdown, Avatar} from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, UserOutlined, AlertOutlined} from '@ant-design/icons';
import store from '../store';
import {CHANGE_MENU_TYPE, CHANGE_THEME_TYPE} from '../store/aciton/type';

const {Header} = Layout;

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
        store.dispatch({type: CHANGE_MENU_TYPE, value: !this.state.collapsed});
    };
    onChangeTheme = () => {
        store.dispatch({type: CHANGE_THEME_TYPE, value: !this.state.theme});
    }
    menu = () => {
        return (
            <Menu>
                <Menu.Item key="0">11111</Menu.Item>
                <Menu.Item key="1">22222222</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="3">退出</Menu.Item>
            </Menu>
        );
    };

    render() {
        let {collapsed, theme} = this.state
        return (
            <Header style={{
                padding: '0 16px',
                backgroundColor: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {collapsed ? <MenuUnfoldOutlined onClick={this.onChangeCollapsed}/> :
                    <MenuFoldOutlined onClick={this.onChangeCollapsed}/>}
                <div style={{
                    width: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <AlertOutlined title='改变主题风格' onClick={this.onChangeTheme}/>
                    <span>欢迎回家</span>
                    <Dropdown overlay={this.menu} trigger={['click']}>
                        {/*href='#!' 禁止跳转*/}
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href='#!'>
                            <Avatar size={20} icon={<UserOutlined/>}/> <DownOutlined/>
                        </a>
                    </Dropdown>,
                </div>
            </Header>
        );
    }

}
