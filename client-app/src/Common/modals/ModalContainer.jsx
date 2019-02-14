import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Modal} from "semantic-ui-react";

@inject('modalStore')
@observer
class ModalContainer extends Component {
    render() {
        const {modalStore: {modal: {open, component, header}, closeModal}} = this.props;
        return (
            <Modal
                size={'mini'}
                open={open}
                onClose={closeModal}
            >
                <Modal.Header id="form-dialog-title">
                    {header}
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {component}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default ModalContainer;