/*
 * @Author: 2021-07-05 11:06:25
 * @Date:2021-07-05 11:29:27
 * @describe:
 */

import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {TOKEN} from '../../js/storage';
import './login.less'
export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formRef = React.createRef();

    onLogin = () => {
        this.formRef.current.validateFields().then(values => {
            TOKEN.setValue(values.email);
            let history = this.props.history;
            history.push('/')
        }).catch((err) => {

        });
    };

    render() {
        return (
            <div className={'login-wrap'}>
                <Form name="basic" ref={this.formRef} className={'login-wrap-form'}>
                    <Form.Item label="账号" name="email" rules={[{required: true, message: ' ', type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={[{required: true, message: ' '}]}>
                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
                    </Form.Item>
                    <div className={'save-btns'}>
                        <Button type='primary' key="submit" onClick={this.onLogin}>登录</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
