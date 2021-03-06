/*
 * @Author: author
 * @Date: 2021-09-16 15:39:59
 * @describe: 用户 新增/编辑模态框
 */

import React, { Component } from 'react';
import NewsModal from '../../../components/newsModal';
import { Form, Input, Button, Radio, Select } from 'antd';
import { PostUserList } from '../../../api/user'
import { GetRoleList } from '../../../api/role';

const { Option } = Select;
export default class userAddEditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			loading: false,
			roleList: []
		};
	}

	formRef = React.createRef();

	UNSAFE_componentWillReceiveProps(preProps) {
		let { showModal, dataInfo } = preProps;
		if (!showModal) return;
		this.setState({ showModal });
		const userInfo = Object.keys(dataInfo).length ? { ...dataInfo } : {
			userName: null,
			userEmail: null,
			isFreeze: false,
			isSystem: false,
			authId: null
		};
		setTimeout(() => {
			this.formRef.current.setFieldsValue(userInfo);
		});
		this.getRoleList()
	}

	// 保存
	onSave = () => {
		this.formRef.current.validateFields().then(values => {
			this.setState({ loading: true });
			PostUserList(values).then(res => {
				this.setState({ showModal: false, loading: false });
				this.props.onUpdataTable();
			});
		}).catch((err) => {
		});
	};

	// 获取角色列表
	getRoleList() {
		let roleList = this.state.roleList
		if (!roleList.length) {
			GetRoleList().then(res => {
				// isSystem
				let _dataList = (res || []).filter(item => !item.isSystem)
				this.setState({ roleList: _dataList })
			})
		}
	};

	render() {
		const { loading, showModal, roleList } = this.state;
		return (
			<NewsModal
				title={'用户'} showModal={showModal}
				btnsList={[
					<Button key="submit" type="primary" loading={loading} onClick={this.onSave}> 确定 </Button>
				]}
				children={
					<Form name="basic" ref={this.formRef} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Form.Item label="用户名称" name="userName"
                                   rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="用户邮箱" name="userEmail"
                                   rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="是否冻结" name="isFreeze">
                            <Radio.Group>
                                <Radio value={false}>否</Radio>
                                <Radio value={true}>是</Radio>
                            </Radio.Group>
                        </Form.Item>
	                  <Form.Item label="角色列表" name="roleId">
	                        <Select showSearch placeholder="下拉选择角色" optionFilterProp="children"
	                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
		                                     {roleList.map((item) => {
			                                     return <Option value={item.id}
			                                                    key={item.id}>({item.roleCode}) {item.roleName}</Option>
		                                     })}
                                        </Select>
                         </Form.Item>
                    </Form>
				}
			/>
		)
	}
}
