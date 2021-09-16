/*
 * @Author: author
 * @Date: 2021-09-01 17:16:13
 * @describe: 角色 新增/编辑模态框
 */

import React, {Component} from 'react';
import NewsModal from '../../../components/newsModal';
import {Form, Input, Button, Radio} from 'antd';
import {PostRoleList} from '../../../api/role';

export default class roleAddEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loading: false
        };
    }

    formRef = React.createRef();

    // componentDidUpdate componentWillReceiveProps
    componentWillReceiveProps(preProps) {
        let {showModal, dataInfo} = preProps;
        if (!showModal) return;
        this.setState({showModal});
        const roleInfo = Object.keys(dataInfo).length ? {...dataInfo} : {
            roleName: null,
            roleCode: null,
            isUse: false
        };
        setTimeout(() => {
            this.formRef.current.setFieldsValue(roleInfo);
        });
    }

    onSave = () => {
        this.formRef.current.validateFields().then(values => {
            this.setState({loading: true});
            PostRoleList({isSystem: false, ...values}).then(res => {
                this.setState({showModal: false, loading: false});
                this.props.onUpdataTable();
            });
        }).catch((err) => {
        });
    };

    render() {
        const {loading} = this.state;
        return (
            <NewsModal
                title={'角色'} showModal={this.state.showModal}
                btnsList={[
                    <Button key="submit" type="primary" loading={loading} onClick={this.onSave}> 确定 </Button>
                ]}
                children={
                    <Form name="basic" ref={this.formRef} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                        <Form.Item label="角色名称" name="roleName"
                                   rules={[{required: true, message: 'Please input your username!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="角色编号" name="roleCode"
                                   rules={[{required: true, message: 'Please input your username!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="是否应用" name="isUse">
                            <Radio.Group>
                                <Radio value={false}>否</Radio>
                                <Radio value={true}>是</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                }
            />
        );
    }
}
