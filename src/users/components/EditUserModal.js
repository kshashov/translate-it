import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import EditUserRoleForm from "./EditUserRoleForm";
import {API_BASE_URL} from "../../constants";
import {request} from "../../util/APIUtils";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class EditUserModal extends Component {
    constructor(props) {
        super(props)
        this.role = this.props.item.role;
        this.state = {
            modal: props.isOpen,
            roles: []
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onUserRoleUpdated = (role) => {
        this.role = role;
    }

    submit = () => {
        return request({
            url: API_BASE_URL + "/api/users/" + this.props.item.id + "/role",
            method: 'POST',
            body: JSON.stringify({id: this.role.id})
        }).then((result) => {
            this.toggle();
            this.props.onItemUpdated();
        }).catch((error) => {
            // Show error
            console.log(error)
        });
    }


    componentDidMount() {
        // load roles
        request({
            url: API_BASE_URL + "/api/roles/",
            method: 'GET'
        }).then(items => {
            this.setState({
                roles: items
            })
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <React.Fragment>
                <Button color="light" onClick={this.toggle} size="sm">
                    <FontAwesomeIcon icon="edit"/> Edit
                </Button>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalBody>
                        <EditUserRoleForm
                            roles={this.state.roles}
                            item={this.props.item}
                            onUserRoleUpdated={this.onUserRoleUpdated}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

EditUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onItemUpdated: PropTypes.func.isRequired
};

export default EditUserModal