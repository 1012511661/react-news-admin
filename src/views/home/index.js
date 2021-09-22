/*
 * @Author:author
 * @Date: 2021-08-02 16:08:00
 * @describe:
 */

import React, { Component } from 'react';
import { GetListData, GetDataId } from '../../api/home';

export default class HoneView extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		GetListData().then(res => {
			console.log(res, '555');
		});
		GetDataId('1').then(res => {
			console.log(res, '66666');
		});
	}

	render() {
		return (
			<div>
				这里是首页
			</div>
		);
	}
}
