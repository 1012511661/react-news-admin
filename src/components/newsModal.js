/*
 * @Author: author
 * @Date: 2021-09-01 16:38:45
 * @describe: 公共模态框
 */

import React, {Component} from 'react';
import {Modal, Button} from 'antd';

export default class newsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            btnsList: []
        };
    }

    // componentDidUpdate componentWillReceiveProps
    componentWillReceiveProps(preProps) {
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
        return (
            <Modal visible={visible} title={title} footer={btnsList}>
                {children}
            </Modal>
        );
    }
}
