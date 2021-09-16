/*
 * @Author: author
 * @Date: 2021-08-29 14:39:39
 * @describe: 权限管理-权限列表
 */

import React, {Component} from 'react';
import {Table, Tag, Button, Modal} from 'antd';
import {GetAuthTemplateList} from '../../api/auth';
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;
export default class AuthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
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
                title: '栏目名称',
                dataIndex: 'title'
            },
            {
                title: '类别',
                render: (item) => {
                    let {permsId, type} = item
                    let name = type ? '菜单' : '权限'
                    return (<Tag color={type ? 'orange' : 'green'} key={permsId}>{name}</Tag>)
                }
            },
            {
                title: '菜单路径/权限编码',
                render: (item) => {
                    let {permsId, type, perms} = item
                    return (<Tag color={type ? 'orange' : 'green'} key={permsId}>{perms}</Tag>)
                }
            },
            {
                title: '操作',
                width: 150,
                render: (item) => {
                    return <div>
                        <Button type="primary" shape="circle" size={'small'}
                                style={{'display': item.type ? 'none' : 'inline-block'}}
                                icon={<EditOutlined/>} onClick={() => {
                            this.onEditAuth(item)
                        }}/>
                        {/*<Button danger shape="circle" size={'small'} className='ml-10'*/}
                        {/*        icon={<DeleteOutlined/>} onClick={() => {*/}
                        {/*    this.onDelItem(item);*/}
                        {/*}}/>*/}
                    </div>;
                }
            }
        ];
    }

    componentDidMount() {
        GetAuthTemplateList().then(res => {
            this.setState({
                dataList: res
            });
        });
    }

    // 删除权限
    onDelItem = (item) => {
        confirm({
            title: '确认删除?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // 不能直接修改 this.state 的数据
                // 目前只模拟删除第一层
                let dataList = (this.state.dataList).filter(data => data.permsId !== item.permsId);
                this.setState({
                    dataList: dataList
                });
            },
            onCancel: () => {
                console.log('Cancel');
            }
        });
    };

    // 编辑 权限
    onEditAuth(item) {
    }

    render() {
        return (<Table dataSource={this.state.dataList} columns={this.columns} pagination={false}/>);
    }
}
