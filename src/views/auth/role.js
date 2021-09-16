/*
 * @Author: author
 * @Date: 2021-08-29 14:36:50
 * @describe:权限管理-角色列表
 */

import React, {Component} from 'react';
import {Table, Tag, Button, Modal, message} from 'antd';
import {GetRoleList, DelRoleList} from '../../api/role';
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import RoleAddEditModal from './components/roleAddEditModal';

const {confirm} = Modal;
export default class RoleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            showModal: false,
            roleInfo: {}
        };
        this.columns = [
            {
                title: '序号',
                width: 80,
                render: (text, record, index) => `${index + 1}`
            },
            // {
            //     title: 'ID',
            //     dataIndex: 'id',
            //     width: 150
            // },
            {
                title: '角色名称',
                dataIndex: 'roleName'
            },
            {
                title: '角色编号',
                dataIndex: 'roleCode'
            },
            {
                title: '是否应用',
                dataIndex: 'isUseName'
            },
            {
                title: '角色编号',
                dataIndex: 'roleCode',
                render: (roleCode) => {
                    return (
                        <Tag color={'orange'} key={roleCode}>{roleCode}</Tag>
                    );
                }
            },
            {
                title: '操作',
                width: 150,
                render: (item) => {
                    return <div>
                        <Button type="primary" className='ml-10' shape="circle" size={'small'}
                                style={{'display': item.isSystem ? 'none' : 'inline-block'}}
                                icon={<EditOutlined/>}
                                onClick={() => {
                                    this.onAddEditItem(item);
                                }}
                        />
                        <Button danger shape="circle" size={'small'} className='ml-10'
                                style={{'display': item.isSystem ? 'none' : 'inline-block'}}
                                icon={<DeleteOutlined/>}
                                onClick={() => {
                                    this.onDelItem(item);
                                }}
                        />
                    </div>;
                }
            }
        ];
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        GetRoleList().then(res => {
            const dataList = (res || []).map(item => {
                item.isUseName = ['否', '是'][Number(item.isUse)];
                return item;
            });
            this.setState({dataList});

        });
    };

    // 删除
    onDelItem = (item) => {
        confirm({
            title: '确认删除?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // this.onGetData()
                DelRoleList(item.id).then(res => {
                    message.success('删除成功');
                    this.init();
                });
            },
            onCancel: () => {
            }
        });
    };

    // 新增/编辑
    onAddEditItem = (item = {}) => {
        this.setState({
            showModal: true,
            roleInfo: item
        });
    };

    // 更新
    onUpdateTable = () => {
        this.setState({showModal: false});
        this.init();
    };
    render() {
        let {dataList, showModal, roleInfo} = this.state;
        return (
            <div>
                <Button type="primary" className='mb-15' onClick={() => {
                    this.onAddEditItem({})
                }}>添加</Button>
                <Table rowKey={item => item.id} dataSource={dataList} columns={this.columns}
                       pagination={{defaultPageSize: 10}}/>
                <RoleAddEditModal showModal={showModal} dataInfo={roleInfo} onUpdataTable={this.onUpdateTable}/>
            </div>
        );
    }
}
