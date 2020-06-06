import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {request} from "../../util/APIUtils";
import {API_BASE_URL} from "../../constants";
import PropTypes from "prop-types";
import UsersDataTable from "./UsersDataTable";

class EditUserRoleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            email: '',
            name: '',
            role: null
        };

        this.onRoleChange = this.onRoleChange.bind(this);
    }


    onRoleChange(e) {
        if (!e.target.value) {
            return;
        }

        const newRole = this.props.roles.find(r => r.title === e.target.value)

        if (!newRole) {
            return;
        }

        this.props.onUserRoleUpdated(newRole);

        this.setState({
            role: newRole
        });
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {

            // Set user
            const {id, email, name, role} = this.props.item
            this.setState({id, email, name, role})
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email"
                           value={this.state.email === null ? '' : this.state.email} readOnly/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input type="text" name="name" id="name"
                           value={this.state.name === null ? '' : this.state.name} readOnly/>
                </FormGroup>
                <FormGroup>
                    <Label for="role">Role</Label>
                    <Input type="select" name="role" id="role"
                           onChange={this.onRoleChange}
                           value={this.state.role == null ? "" : this.state.role.title}>
                        {
                            this.props.roles
                                .map((e) => {
                                    return <option key={e.id} value={e.title}>{e.title}</option>;
                                })
                        }
                    </Input>
                </FormGroup>
            </Form>
        );
    }
}

EditUserRoleForm.propTypes = {
    item: PropTypes.object.isRequired,
    roles: PropTypes.array.isRequired,
    onUserRoleUpdated: PropTypes.func.isRequired
};

export default EditUserRoleForm