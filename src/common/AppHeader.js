import React, {Component, useState} from 'react';
import {NavLink as RRNavLink, withRouter} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import {Menu} from "antd";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
import UsersDataTable from "../users/components/UsersDataTable";

class AppHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {location} = this.props;

        return (<React.Fragment>{
            this.props.authenticated ? (
                <Menu theme="light" mode="horizontal" selectedKeys={location.pathname}>
                    <Menu.Item key="/users">
                        <Link to="/users">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="/profile">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={this.props.onLogout}>
                        Logout
                    </Menu.Item>
                </Menu>
            ) : (
                <Menu theme="light" mode="horizontal" selectedKeys={location.pathname}>
                    <Menu.Item key="/login">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                </Menu>
            )
        }</React.Fragment>);
    }
}

AppHeader.defaultProps  = {
    authenticated: false,
};

AppHeader.propTypes = {
    authenticated: PropTypes.bool,
    onLogout: PropTypes.func.isRequired
};

export default withRouter(AppHeader);