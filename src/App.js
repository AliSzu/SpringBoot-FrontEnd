import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import {ACCESS_TOKEN, API_BASE_URL} from './constants/constants';
import Home from "./pages/Home";
import Get from "./pages/Get";
import Post from "./pages/Post"
import Put from "./pages/Put";
import Delete from "./pages/Delete";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import PrivateRoute from './common/PrivateRoute';
import HomeRoute from './common/HomeRoute';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    getCurrentUser = () => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }

        return this.request({
            url: API_BASE_URL + "/user/me",
            method: 'GET'
        });
    }

    request = (options) => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }

        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                })
            );
    };


    loadCurrentlyLoggedInUser() {
        this.getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                });
            }).catch(error => {
            console.log(error)
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        let currentUser2 = this.state.currentUser;
        return (
            <div className="app">
                <div className="app-top-box">
                </div>
                <div className="app-body">
                    <Switch>
            
                        <PrivateRoute path="/profile" authenticated={this.state.authenticated}
                                      currentUser={this.state.currentUser}
                                      component={Profile}></PrivateRoute>
                        <Route path="/get" component={Get}/>
                        <Route path="/post"component={Post}/>
                        <Route path="/put"component={Put}/>
                        <Route path="/delete"component={Delete}/>
                        <Route exact path='/'render={(props) => (<Home  authenticated={this.state.authenticated}   onLogout={this.handleLogout} currentUser={this.state.currentUser} {...props} authed={true} />)}></Route>
                        <Route path="/login"
                               render={(props) => <Login
                                   authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;