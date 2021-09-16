/*
* @Author: author
* @Date: 2021-09-09 14:38:24
* @describe: 权限 新增/编辑抽屉
*/

import React, {Component} from 'react';
import NewsDrawer from '../../../components/newsDrawer'
import {Button, Form, Input, Radio, Tree} from 'antd';
import '../style/authAddEditDrawer.less'

export default class authAddEditDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loading: false,
            treeData: []

        };
    }

    formRef = React.createRef();

    // componentDidUpdate componentWillReceiveProps
    componentWillReceiveProps(preProps) {
        let {showModal, dataInfo, treeData} = preProps;
        if (!showModal) return;
        this.setState({showModal, treeData});
        const roleInfo = Object.keys(dataInfo).length ? {...dataInfo} : {
            authName: null,
            authCode: null,
            isUse: false
        };
        setTimeout(() => {
            this.formRef.current.setFieldsValue(roleInfo);
        });
    }

    onSave = () => {
    }
    onSelect = () => {

    }
    onExpand = () => {

    }
    onCheck = (list, info) => {
        let arr = (list.length && this.handleCheckTree(list, this.state.treeData, [])) || []
    }
    handleCheckTree = (list = [], tree = [], arr = []) => {
        for (let item of tree) {
            let {key, type, perms, children} = item
            if (!type && list.indexOf(key) > -1) arr.push(perms)
            if (Array.isArray(children) && children.length) {
                this.handleCheckTree(list, children, arr)
            }
        }
        return arr
    }

    render() {
        const {loading, treeData} = this.state;
        return (
            <NewsDrawer title={'权限详情'} showModal={this.state.showModal} className={'auth-drawer'}
                        btnsList={[
                            <Button key="submit" type="primary" loading={loading} onClick={this.onSave}> 确定 </Button>
                        ]}
                        children={
                            <Form name="basic" ref={this.formRef} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                                <Form.Item label="权限名称" name="authName"
                                           rules={[{required: true, message: 'Please input your username!'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="权限编号" name="authCode"
                                           rules={[{required: true, message: 'Please input your username!'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="是否应用" name="isUse">
                                    <Radio.Group>
                                        <Radio value={false}>否</Radio>
                                        <Radio value={true}>是</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div className={'auth-drawer-tree-wrap'}>
                                    <Tree
                                        checkable
                                        defaultExpandAll
                                        showLine
                                        onSelect={this.onSelect}
                                        onExpand={this.onExpand}
                                        onCheck={this.onCheck}
                                        treeData={treeData}
                                    />
                                </div>
                            </Form>
                        }
            />
        )
    }
}
