import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
export class SubHeader extends Component{
    render(){
        return(
            <div className="row">
                <Link to="/category" className="nav-link">List</Link>
                <Link  to="/category/add" className="nav-link">Add</Link>
            </div>
        );
    }
}