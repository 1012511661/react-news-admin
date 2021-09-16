/*
 * @Author: author
 * @Date: 2021-08-29 14:39:39
 * @describe: 权限管理-权限列表
 */

import React, {Component} from 'react';
import {Table, Button, Modal} from 'antd';
import {GetAuthList, GetAuthTemplateList} from '../../api/auth';
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import AuthAddEditDrawer from './components/authAddEditDrawer'

const {confirm} = Modal;
export default class AuthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authInfo: {},
            showModal: false,
            dataList: [],
            treeData: []
        };
        this.columns = [
            // {
            //     title: 'ID',
            //     dataIndex: 'key',
            //     width: 150
            // },
            {
                title: '序号',
                width: 80,
                render: (text, record, index) => `${index + 1}`
            },
            {
                title: '权限名称',
                dataIndex: 'authName'
            },
            {
                title: '权限编码',
                dataIndex: 'authCode'
            },
            {
                title: '是否应用',
                dataIndex: 'isUseName'
            },
            {
                title: '操作',
                width: 150,
                render: (item) => {
                    return <div>
                        <Button type="primary" shape="circle" size={'small'}
                                style={{'display': item.isSystem ? 'none' : 'inline-block'}}
                                icon={<EditOutlined/>} onClick={() => {
                            this.onEditAuth(item)
                        }}/>
                        <Button danger shape="circle" size={'small'} className='ml-10'
                                style={{'display': item.isSystem ? 'none' : 'inline-block'}}
                                icon={<DeleteOutlined/>} onClick={() => {
                            this.onDelItem(item);
                        }}/>
                    </div>;
                }
            }
        ];
    }

    componentDidMount() {
        Promise.all([GetAuthList(), GetAuthTemplateList()]).then(res => {
            let [authList, tempList] = res
            const dataList = (authList || []).map(item => {
                item.isUseName = ['否', '是'][Number(item.isUse)];
                return item
            })
            const treeData = this.handleTemp(tempList)
            this.setState({dataList, treeData});
        })
    }

    // 处理 Tree
    handleTemp = (tempList = []) => {
        for (let item of tempList) {
            let child = item.children || []
            item.disableCheckbox = !item.children && item.type
            if (Array.isArray(child) && child.length) {
                this.handleTemp(child)
            }
        }
        return tempList
    }
    init = () => {
        GetAuthList().then(res => {
            const dataList = (res || []).map(item => {
                item.isUseName = ['否', '是'][Number(item.isUse)];
                return item
            })
            this.setState({dataList});
        });

    }
    // 更新
    onUpdateTable = () => {
        this.setState({showModal: false});
        this.init();
    };
    // 删除权限
    onDelItem = (item) => {
        confirm({
            title: '确认删除?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // 不能直接修改 this.state 的数据
                const dataList = (this.state.dataList).filter(data => data.id !== item.id);
                this.setState({dataList});
            },
            onCancel: () => {
            }
        });
    };

    // 编辑 权限
    onEditAuth(item) {
        this.setState({
            showModal: true,
            authInfo: item
        });
    }

    render() {
        let {dataList, showModal, authInfo, treeData} = this.state;
        return (
            <div>
                <Button type="primary" className='mb-15' onClick={() => {
                    this.onEditAuth({})
                }}>添加</Button>
                <Table dataSource={dataList} columns={this.columns} pagination={false}/>
                <AuthAddEditDrawer showModal={showModal} dataInfo={authInfo} treeData={treeData}
                                   onUpdataTable={this.onUpdateTable}/>
            </div>
        );
    }
}
