import React, {Component} from 'react'
// import {Table, Button, UncontrolledTooltip, Badge} from 'reactstrap';
import EditUserModal from "./EditUserModal";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Space, Table, Tag, Tooltip} from "antd";
import {TablePaginationConfig} from "antd/lib/table/interface";

class UsersDataTable extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: true,
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                render: role => (
                    <Tooltip title={role.description}>
                        <Tag color={'geekblue'}>
                            {role.title.toUpperCase()}
                        </Tag>
                    </Tooltip>
                ),
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (text, record) => (
                    <Space size="middle">
                        <EditUserModal item={record} onItemUpdated={this.props.onItemUpdated} isOpen={false}/>
                    </Space>
                ),
            },
        ];

        return (<Table
            rowKey={item=>item.id}
            columns={columns}
            dataSource={this.props.items}
            loading={this.props.loading}
            pagination={this.props.pagination}/>);
    }
}

UsersDataTable.defaulytProps = {
    loading: PropTypes.bool,
    pagination: {}
};

UsersDataTable.propTypes = {
    items: PropTypes.array.isRequired,
    onItemUpdated: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    pagination: PropTypes.instanceOf(TablePaginationConfig)
};

export default UsersDataTable