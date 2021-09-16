/*
 * @Author:author
 * @Date: 2021-08-05 11:00:20
 * @describe:
 */
import React, { Component } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'; // Switch 只匹配一个
import { TOKEN } from '../js/storage';

import LoginView from '../views/login';
import IndexLayout from '../layout/index';

export default class IndexRouter extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path="/login" component={LoginView}/>
					{/* <Route path="/" component={IndexLayout} /> */}
					<Route
						path="/"
						render={() =>
							TOKEN.getValue() ? <IndexLayout/> : <Redirect to='/login'></Redirect>
						}
					/>
				</Switch>
			</HashRouter>
		);
	}
}
