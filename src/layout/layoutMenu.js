/*
 * @Author:author
 * @Date: 2021-08-21 14:57:47
 * @describe:
 */

import React, {Component} from 'react';
import {GetMenuList} from '../api/layout';
import {withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined, AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import store from '../store';
import './layout.less';

const {Sider} = Layout;
const {SubMenu} = Menu;

class LayoutMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            iconList: {
                '/home': <HomeOutlined/>,
                '/user': <AppstoreOutlined/>,
                '/auth': <MailOutlined/>
            },
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

    componentDidMount() {
        GetMenuList().then(res => {
            this.setState({
                menuList: res
            });
        });

    }

    renderMenu = (menuList) => {
        return menuList.map(item => {
            if (Array.isArray(item.children) && item.children.length) {
                return <SubMenu key={item.path} icon={this.state.iconList[item.path]} title={item.title}>
                    {this.renderMenu(item.children)}
                </SubMenu>;
            } else {
                return <Menu.Item key={item.path} icon={this.state.iconList[item.path]}
                                  onClick={() => {
                                      this.props.history.push(item.path);
                                  }}>{item.title}</Menu.Item>;
            }
        });
    };
    activeRoute = () => {
        const pathName = this.props.history.location.pathname;
        let openName = pathName !== '/' ? pathName : '/home';
        return [openName];
    };
    openRoute = () => {
        const pathName = this.props.history.location.pathname;
        const openName = '/' + pathName.split('/')[1];
        return [openName];
    };

    render() {
        let {collapsed, menuList, theme} = this.state;
        return (
            <Sider theme={theme ? 'light' : 'dark'} trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">{collapsed ? 'cTMS' : 'cTMS管理系统'}{theme}</div>
                <Menu theme={theme ? 'light' : 'dark'} mode="inline" defaultSelectedKeys={this.activeRoute}
                      defaultOpenKeys={this.openRoute}>
                    {this.renderMenu(menuList)}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(LayoutMenu);
