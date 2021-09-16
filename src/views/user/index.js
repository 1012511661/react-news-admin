/*
 * @Author: author
 * @Date: 2021-08-21 15:22:48
 * @describe: 用户
 */

import React, {Component} from 'react';
import {Table, Tag, Button, Modal, message} from 'antd';
import {GetUserList, DelUserList} from '../../api/user';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import UserAddEditModal from './components/userAddEditModal';

const {confirm} = Modal;
export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            showModal: false,
            userInfo: {}
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
                title: '用户名称',
                dataIndex: 'userName'
            },
            {
                title: '用户邮箱',
                dataIndex: 'userEmail'
            },
            {
                title: '是否冻结',
                dataIndex: 'isFreezeName',
                render: (isFreezeName) => {
                    return (
                        <Tag color={'orange'} key={isFreezeName}>{isFreezeName}</Tag>
                    );
                }
            },
            {
                title: '操作',
                width: 150,
                render: (item) => {
                    return <div>
                        <Button type="primary" className='ml-10' shape="circle" size={'small'}
                                style={{'display': item.isFreeze ? 'none' : 'inline-block'}}
                                icon={<EditOutlined/>}
                                onClick={() => {
                                    this.onAddEditItem(item)
                                }}
                        />
                        <Button danger shape="circle" size={'small'} className='ml-10'
                                icon={<DeleteOutlined/>}
                                onClick={() => {
                                    this.onDelItem(item)
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
        GetUserList().then(res => {
            const dataList = (res || []).map(item => {
                item.isFreezeName = ['否', '是'][Number(item.isFreeze)];
                return item;
            });
            this.setState({dataList});

        });
    }
    // 删除
    onDelItem = (item) => {
        confirm({
            title: '确认删除?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // this.onGetData()
                DelUserList(item.id).then(res => {
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
            userInfo: item
        });
    };

    // 更新
    onUpdateTable = () => {
        this.setState({showModal: false});
        this.init();
    };

    render() {
        let {dataList, showModal, userInfo} = this.state;
        return (
            <div>
                <Button type="primary" className='mb-15' onClick={() => {
                    this.onAddEditItem({})
                }}>添加</Button>
                <Table rowKey={item => item.id} dataSource={dataList} columns={this.columns}
                       pagination={{defaultPageSize: 10}}/>
                <UserAddEditModal showModal={showModal} dataInfo={userInfo} onUpdataTable={this.onUpdateTable}/>
            </div>
        );
    }
}
