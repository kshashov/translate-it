import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const DialogButton = ({body, footer, title, isToggle, isOpen, ...rest}) => {
    const [modal, setModal] = useState(isOpen);
    const toggle = () => setModal(!modal)

    return (
        <React.Fragment>
            <Button {...rest} onClick={toggle}/>
            <Modal
                isOpen={modal}
                {...((isToggle || false) ? {toggle: toggle} : {})}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                {body}
                {footer}
            </Modal>
        </React.Fragment>
    );
}

export default DialogButton