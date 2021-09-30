/*
 * @Author: author
 * @Date: 2021-09-09 14:38:24
 * @describe: 权限 新增/编辑抽屉
 */

import React, { Component } from 'react';
import NewsDrawer from '../../../components/newsDrawer'
import { Button, Form, Input, Radio, Tree } from 'antd';
import '../style/authAddEditDrawer.less'
import { PostAuthInfo, PatchAuthInfo } from '../../../api/auth'

export default class authAddEditDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			loading: false,
			treeData: [],
			auths: [],
			id: null
		};
	}

	formRef = React.createRef();

	// componentDidUpdate componentWillReceiveProps
	UNSAFE_componentWillReceiveProps(preProps) {
		let { showModal, dataInfo, treeData } = preProps;
		if (!showModal) return;
		this.setState({ showModal, treeData });
		const authInfo = Object.keys(dataInfo).length ? { ...dataInfo } : {
			authName: null,
			authCode: null,
			isUse: false
		};
		setTimeout(() => {
			this.formRef.current.setFieldsValue(authInfo);
			let { id, auths } = authInfo
			this.setState({ auths: auths || [], id })
		});
	}

	// 保存
	onSave = () => {
		this.formRef.current.validateFields().then(values => {
			this.setState({ loading: true });
			let { id, auths } = this.state
			let { authName, authCode, isUse } = values
			let data = { id, authName, authCode, isUse, auths }
			if (id) {
				PatchAuthInfo(id, data).then(res => {
					this.handleSuccess();
				});
			} else {
				PostAuthInfo({ isSystem: false, ...data }).then(res => {
					this.handleSuccess();
				})
			}
		}).catch((err) => {
		});
	}
	// 处理请求
	handleSuccess = () => {
		this.setState({ showModal: false, loading: false });
		this.props.onUpdataTable();
	}

	// 选中
	onCheck = (list, info) => {
		this.setState({ auths: list })
	}


	render() {
		const { showModal, loading, treeData, auths } = this.state;
		return (
			<NewsDrawer title={'权限详情'} showModal={showModal} className={'auth-drawer'}
			            btnsList={[
				            <Button key="submit" type="primary" loading={loading}
				                    onClick={this.onSave}> 确定 </Button>
			            ]}
			            children={
				            <Form name="basic" ref={this.formRef} labelCol={{ span: 4 }}
				                  wrapperCol={{ span: 20 }}>
                                    <Form.Item label="权限名称" name="authName"
                                               rules={[{ required: true, message: 'Please input your username!' }]}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label="权限编号" name="authCode"
                                               rules={[{ required: true, message: 'Please input your username!' }]}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label="是否应用" name="isUse">
                                        <Radio.Group>
                                             <Radio value={true}>是</Radio>
	                                       <Radio value={false}>否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item label="权限" className={'auth-drawer-tree-wrap'}>
                                        <Tree checkable defaultExpandAll showLine
                                              checkedKeys={auths} treeData={treeData}
                                              onExpand={this.onExpand} onCheck={this.onCheck}
                                        />
                                    </Form.Item>
                               </Form>
			            }
			/>
		)
	}
}
