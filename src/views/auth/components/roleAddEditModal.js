/*
 * @Author: author
 * @Date: 2021-09-01 17:16:13
 * @describe: 角色 新增/编辑模态框
 */

import React, { Component } from 'react';
import NewsModal from '../../../components/newsModal';
import { Form, Input, Button, Radio, Select } from 'antd';
import { PostRoleList, PatchRoleInfo } from '../../../api/role';
import { GetAuthList } from '../../../api/auth';

const { Option } = Select;
export default class roleAddEditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			loading: false,
			id: null,
			authList: []
		};
	}

	formRef = React.createRef();

	// componentDidUpdate componentWillReceiveProps
	UNSAFE_componentWillReceiveProps(preProps) {
		let { showModal, dataInfo } = preProps;
		if (!showModal) return;
		this.setState({ showModal });
		const roleInfo = Object.keys(dataInfo).length ? { ...dataInfo } : {
			roleName: null,
			roleCode: null,
			isUse: false
		};
		setTimeout(() => {
			this.formRef.current.setFieldsValue(roleInfo);
			let { id } = roleInfo
			this.setState({ id })
		});
		this.getAuthList()
	}

	// 保存
	onSave = () => {
		this.formRef.current.validateFields().then(values => {
			let { id } = this.state
			id ? PatchRoleInfo(id, values).then(res => {
				this.handleSuccess();
			}) : PostRoleList({ isSystem: false, ...values }).then(res => {
				this.handleSuccess();
			});
		}).catch((err) => {
		});
	};

	// 获取权限列表
	getAuthList() {
		let authList = this.state.authList
		if (!authList.length) {
			GetAuthList().then(res => {
				this.setState({ authList: res || [] })
			})
		}
	};

	// 处理请求
	handleSuccess = () => {
		this.setState({ showModal: false, loading: false });
		this.props.onUpdataTable();
	}

	render() {
		const { loading, authList } = this.state;
		return (
			<NewsModal
				title={'角色'} showModal={this.state.showModal}
				btnsList={[
					<Button key="submit" type="primary" loading={loading} onClick={this.onSave}> 确定 </Button>
				]}
				children={
					<Form name="basic" ref={this.formRef} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                                   <Form.Item label="角色名称" name="roleName"
                                              rules={[{ required: true, message: 'Please input your username!' }]}>
                                       <Input/>
                                   </Form.Item>
                                   <Form.Item label="角色编号" name="roleCode"
                                              rules={[{ required: true, message: 'Please input your username!' }]}>
                                        <Input/>
                                    </Form.Item>
                                   <Form.Item label="是否应用" name="isUse">
                                        <Radio.Group>
                                             <Radio value={true}>是</Radio>
	                                       <Radio value={false}>否</Radio>
                                         </Radio.Group>
                                   </Form.Item>
                                   <Form.Item label="权限列表" name="authId">
	                                   <Select showSearch placeholder="下拉选择权限" optionFilterProp="children"
	                                           filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
		                                     {authList.map((item) => {
			                                     return <Option value={item.id}
			                                                    key={item.id}>({item.authCode}) {item.authName}</Option>
		                                     })}
                                        </Select>
                                   </Form.Item>
                              </Form>
				}
			/>
		);
	}
}
