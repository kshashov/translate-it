import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const ConfirmationDialog = ({title, description, isOpen, onConfirm, onCancel, ...rest}) => {
    const [modal, setModal] = useState(isOpen);
    const toggle = () => setModal(!modal)
    const ok = () => {
        onConfirm();
        toggle();
    }
    const cancel = () => {
        onCancel();
        toggle();
    }

    return (
        <Modal isOpen={modal}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                {description}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={ok}>Ok</Button>{' '}
                <Button color="secondary" onClick={cancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmationDialog