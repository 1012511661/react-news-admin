/*
 * @Author: author
 * @Date: 2021-08-21 13:43:57
 * @describe:
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LayoutMenu from './layoutMenu';
import LayoutHeader from './layoutHeader';

import HomeView from '../views/home';
import UserView from '../views/user';
import AuthView from '../views/auth/auth';
import RoleView from '../views/auth/role';
import MyNewsView from '../views/news/news'
import NewsCatalogueView from '../views/news/catalogue'

import NotFoundPage from './404';

import { Layout } from 'antd';
// import { GetMenuList } from '../api/layout';

const { Content } = Layout;
export default class IndexLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuList: []
		};
		this.menuMap = {
			'/home': HomeView,
			'/user/list': UserView,
			'/auth/role': RoleView,
			'/auth/list': AuthView

		}
	}

	componentDidMount() {
		// GetMenuList().then(res => {
		// 	// this.setState({menuList: res});
		// 	console.log(res,this.state, '333')
		//
		// });
	}

	render() {
		// let { menuList } = this.state;
		return (
			<Layout style={{ height: '100%' }}>
				<LayoutMenu/>
				<Layout className="layout">
					<LayoutHeader/>
					<Content className="layout-content">
						<Switch>
							{/*exact*/}
							{/*{*/}
							{/*	menuList.map(item=>*/}
							{/*		<Route path={item.path} component={HomeView}/>*/}
							{/*	)*/}
							{/*}*/}
							<Route path="/home" component={HomeView}/>
							<Route path="/user/list" component={UserView}/>
							<Route path="/auth/role" component={RoleView}/>
                                          <Route path="/auth/list" component={AuthView}/>
							<Route path="/news/news" component={MyNewsView}/>
							<Route path="/news/catalogue" component={NewsCatalogueView}/>
							<Redirect from='/' to='/home' exact/>
							<Route path="*" component={NotFoundPage}/>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		);
	}
}
