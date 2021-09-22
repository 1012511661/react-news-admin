/*
* @Author: author
* @Date: 2021-09-09 14:29:37
* @describe: 公共抽屉
*/

import React, {Component} from 'react';
import {Drawer, Button} from 'antd';

export default class newsDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            btnsList: []
        };
    }

    UNSAFE_componentWillReceiveProps(preProps) {
        let {showModal, btnsList} = preProps;
        let _btnsList = [<Button key="back" className={'ml-10'} onClick={this.handleCancel}>取消</Button>];
        this.setState({visible: showModal, btnsList: showModal ? [...btnsList, _btnsList] : _btnsList});
    }

    handleCancel = () => {
        this.setState({visible: false});
    };

    render() {
        const {visible, btnsList} = this.state;
        const {title, children} = this.props;
        const footerStyle = {
            display: 'flex',
            justifyContent: 'flex-end'
        }
        return (
            <Drawer title={title} width={500} visible={visible} onClose={this.handleCancel} footer={btnsList}
                    footerStyle={footerStyle}>
                {children}
            </Drawer>
        )
    }
}
