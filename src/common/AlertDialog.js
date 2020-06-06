import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const AlertDialog = ({title, description, isOpen, onConfirm, onCancel, ...rest}) => {
    const [modal, setModal] = useState(isOpen);
    const toggle = () => setModal(!modal)

    return (
        <Modal isOpen={modal}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                {description}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Ok</Button>{' '}
            </ModalFooter>
        </Modal>
    );
}

export default AlertDialog