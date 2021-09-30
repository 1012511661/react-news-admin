/*
 * @Author: author
 * @Date: 2021-09-27 17:55:54
 * @describe:
 */
import React, { Component } from 'react';
import NewsDrawer from '../../../components/newsDrawer'
import { Button } from 'antd';

export default class newsAddEditDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			loading: false
		};
	}

	render() {
		const { showModal, loading } = this.state;
		return (
			<NewsDrawer title={'权限详情'} showModal={showModal} className={'auth-drawer'}
			            btnsList={[
				            <Button key="submit" type="primary" loading={loading}
				                    onClick={this.onSave}> 确定 </Button>
			            ]}
			            children={
			            	<p>新闻编辑新建</p>
			            }
			/>
		)
	}
}
