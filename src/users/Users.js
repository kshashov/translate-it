import React, {Component} from 'react'
import {request} from '../util/APIUtils';
import UsersTable from './components/UsersDataTable'
import {API_BASE_URL} from "../constants";
import {Col, Row, Typography} from "antd";

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            size: 4,
            totalItems:0,
            loading: true,
            items: []
        }
    }

    getItems = (currentPage, size) => {
        this.setState({
            loading: true
        })

        return request({
            url: API_BASE_URL + `/api/users/?page=${currentPage - 1}&size=${size}`,
            method: 'GET'
        }).then(response => {
            this.setState({
                loading: false,
                items: response.items,
                currentPage: response.page + 1,
                size: response.size,
                totalItems: response.totalItems
            })
        }).catch(err => {
            this.setState({
                loading: false,
                items: []
            });
            console.log(err)
        });
    }

    pageSize = (n, size) => {
        this.getItems(1, size);
    }

    page = (n) => {
        this.getItems(n, this.state.size);
    }

    updateState = () => {
        this.getItems(this.state.currentPage, this.state.size);
    }

    componentDidMount() {
        this.getItems(this.state.currentPage, this.state.size);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Typography.Title>Users</Typography.Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <UsersTable items={this.state.items}
                                    onItemUpdated={this.updateState}
                                    loading={this.state.loading}
                                    pagination={{
                                        pageSizeOptions:["4", "10", "30", "50"],
                                        showLessItems: true,
                                        showSizeChanger: true,
                                        current: this.state.currentPage,
                                        pageSize: this.state.size,
                                        total:this.state.totalItems,
                                        onChange:this.page,
                                        onShowSizeChange:this.pageSize
                                    }}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Users