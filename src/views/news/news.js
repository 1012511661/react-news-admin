/*
 * @Author: author
 * @Date: 2021-09-26 10:59:53
 * @describe: 我的新闻
 */
import React, { Component } from 'react';
import { GetMyNewsData } from '../../api/news'
import { Button, message, Modal, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NEWS_STATUS_LIST } from '../../js/public'

const { confirm } = Modal;

export default class news extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: []
		};
		this.columns = [
			{
				title: '序号',
				width: 80,
				render: (text, record, index) => `${index + 1}`
			},
			{
				title: '新闻名称',
				dataIndex: 'newName'
			},
			{
				title: '状态',
				dataIndex: 'statusName',
				render: (statusName, item) => {
					return <Tag color={item.statusColor} key={statusName}>{statusName}</Tag>
				}
			},
			{
				title: '操作',
				width: 150,
				render: (item) => {
					return (<div>
                                          <Button type="primary" shape="circle" size={'small'} icon={<EditOutlined/>}
                                                  onClick={() => {
	                                                  this.onAddEdit(item)
                                                  }}/>
                                          <Button shape="circle" size={'small'} className='ml-10' icon={<FormOutlined/>}
                                                  onClick={() => {
	                                                  this.onAuditItem(item)
                                                  }}/>
                                          <Button danger shape="circle" size={'small'} className='ml-10'
                                                  icon={<DeleteOutlined/>}
                                                  onClick={() => {
	                                                  this.onDelItem(item);
                                                  }}/>
                                      </div>);
				}

			}
		];

	}

	componentDidMount() {
		GetMyNewsData().then(res => {
			let dataList = (res || []).map(item => {
				let _status = NEWS_STATUS_LIST.find(f => f.value === item.status)
				item.statusName = _status?.label
				item.statusColor = _status?.color
				return item
			})
			this.setState({ dataList });
		})
	}

	// 新增编辑
	onAddEdit = (item = {}) => {
		console.log(item, '新增编辑')
	}
	// 发送审批
	onAuditItem = (item) => {
		console.log(item, '发送审批')

	}
	// 删除
	onDelItem = (item) => {
		confirm({
			title: '确认删除?',
			icon: <ExclamationCircleOutlined/>,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				// DelAuthInfo(item.id).then(res => {
				// 	message.success('删除成功');
				// 	this.init();
				// 	// const dataList = (this.state.dataList).filter(data => data.id !== item.id);
				// 	// this.setState({ dataList });
				// })

			},
			onCancel: () => {
			}
		});
	}


	render() {
		let { dataList } = this.state;
		return (
			<div>
                      <Button type="primary" className='mb-15' onClick={() => {
	                      this.onAddEdit({})
                      }}>添加</Button>
                      <Table rowKey={item => item.id} dataSource={dataList} columns={this.columns} pagination={false}/>
                  </div>
		)
	}
}
