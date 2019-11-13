import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Home} from './Home';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {About} from "./About";
import {Add} from "./category/Add";
import {List} from "./category/List";
import {Edit} from "./category/Edit";
import {Error404} from "./Error404";

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                {/*<div className="row justify-content-center">*/}
                <div className="row">
                    <Router>
                        <Switch>
                            <Route exact path='/' component= {Home} />
                            <Route exact path="/category" component={List} />
                            <Route exact path='/about' component={About} />
                            <Route exact path="/category/add" component={Add} />
                            <Route exact path="/category/edit/:id" component={Edit} />
                            <Route exact path="*" component={Error404} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}

