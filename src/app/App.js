import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import Users from '../users/Users'
import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN, CURRENT_USER} from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import {Container} from "reactstrap";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faKey, faEdit} from '@fortawesome/free-solid-svg-icons';
import {Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;

library.add(faEnvelope, faKey, faEdit);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                localStorage.setItem(CURRENT_USER, response);
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        // this.setState({
        //     currentUser: localStorage.getItem(CURRENT_USER),
        //     authenticated: true
        // });
        // if (!this.state.currentUser) {
        this.loadCurrentlyLoggedInUser();
        // }
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator spinning = {this.state.loading}/>
        }

        return (
                <Layout className="layout">
                    <Header>
                        <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <div className="site-layout-content">
                            <Switch>
                                <Route exact path="/" component={Home}></Route>
                                <PrivateRoute path="/users" authenticated={this.state.authenticated}
                                              currentUser={this.state.currentUser} component={Users}></PrivateRoute>
                                <PrivateRoute path="/profile/" authenticated={this.state.authenticated}
                                              currentUser={this.state.currentUser} component={Profile}></PrivateRoute>
                                <Route path="/login" render={(props) => <Login
                                    authenticated={this.state.authenticated} {...props} />}></Route>
                                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                                <Route component={NotFound}></Route>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>©2020 github.com/kshashov</Footer>
                    <Alert stack={{limit: 3}}
                           timeout={3000}
                           position='top-right' effect='slide' offset={65}/>
                </Layout>
        );
    }
}

export default App;
