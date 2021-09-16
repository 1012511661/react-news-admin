/*
 * @Author: author
 * @Date: 2021-08-21 13:43:57
 * @describe:
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SideMenu from './layoutMenu';
import TopHeader from './layouHeader';

import HomeView from '../views/home';
import UserView from '../views/user';
import AuthView from '../views/auth/auth';
import RoleView from '../views/auth/role';

import NotFoundPage from './404';

import { Layout } from 'antd';

const {Content} = Layout;
export default class IndexLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Layout style={{height: '100%'}}>
				<SideMenu/>
				<Layout className="site-layout">
					<TopHeader/>
					<Content className="site-layout-background"
					         style={{
						         margin: '24px 16px',
						         padding: 24,
						         minHeight: 280,
						         backgroundColor: '#FFF'
					         }}>
						<Switch>
							<Route path="/home" component={HomeView}/>
							<Route path="/user/list" component={UserView}/>
							<Route path="/auth/role" component={RoleView}/>
							<Route path="/auth/list" component={AuthView}/>
							<Redirect from='/' to='/home' exact/>
							<Route path="*" component={NotFoundPage}/>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		);
	}
}
